import { onAuthStateChanged } from "firebase/auth";
import { writable } from "svelte/store";
import { getFb } from "../routes/fb";
import { getRecipes } from "./db";
import type { Func, Recipe } from "./types";

const TOAST_TIME = 10 * 1000;

export const toastQueue = writable<
  { text: string; since: number; open: boolean }[]
>([]);

export const toast = (text: string) => {
  toastQueue.update(q => [...q, { text, since: Date.now(), open: true }]);
};

const initToasts = () => {
  const int = setInterval(() => {
    toastQueue.update(q =>
      q.map(t => ({ ...t, open: t.open && Date.now() - t.since < TOAST_TIME })),
    );
  }, 1000);
  return () => clearInterval(int);
};

export const toastWrap = <T extends Func>(func: T) => {
  return async (
    ...params: Parameters<T>
  ): Promise<Awaited<ReturnType<T>> | Error> => {
    try {
      return await func(...params);
    } catch (error) {
      const message = error instanceof Error ? error.message : `${error}`;
      toast(message);
      return new Error(message);
    }
  };
};

export const recipes = writable<Recipe[] | undefined>(undefined);

export const updateRecipes = async () => {
  const { auth, db } = getFb();
  recipes.set((await getRecipes(auth, db)) ?? []);
};

const initRecipes = () => {
  updateRecipes();
  return onAuthStateChanged(getFb().auth, updateRecipes);
};

export const initAll = () => {
  const ends = [initRecipes(), initToasts()];
  return () => ends.map(f => f());
};

export const toBePreviewed = writable<Recipe | undefined>(undefined);
export const toBeCooked = writable<Recipe | undefined>(undefined);
export const toBeEdited = writable<Recipe | undefined>(undefined);
