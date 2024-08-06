import { writable } from "svelte/store";
import type { Recipe } from "./types";
import { getFb } from "../routes/fb";
import { getRecipes } from "./db";
import { onAuthStateChanged } from "firebase/auth";

const TOAST_TIME = 10 * 1000;

export const toastQueue = writable<
  { text: string; since: number; open: boolean }[]
>([]);

export const toast = (text: string) => {
  toastQueue.update(q => [...q, { text, since: Date.now(), open: true }]);
};

setInterval(() => {
  toastQueue.update(q =>
    q.map(t => ({ ...t, open: t.open && Date.now() - t.since < TOAST_TIME })),
  );
}, 1000);

export const toastWrap = <T extends (...args: any[]) => any>(func: T) => {
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

export const initialiseRecipes = async () => {
  await updateRecipes();
  onAuthStateChanged(getFb().auth, updateRecipes);
};

export const selectedRecipe = writable<Recipe | undefined>(undefined);
