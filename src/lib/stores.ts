import { onAuthStateChanged } from "firebase/auth";
import { writable } from "svelte/store";
import { getFb } from "../routes/fb";
import { getRecipes } from "./db";
import { isRecord } from "./types";
import { getKeys, keyValuesToObj } from "./util";
import type { Func, Recipe } from "./types";
import type { User } from "firebase/auth";
import type { Readable } from "svelte/store";

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

export const recipes = writable<
  { original: Recipe; edited?: Recipe }[] | undefined
>(undefined);

export const updateRecipes = async () => {
  const { auth, db } = getFb();
  recipes.set((await getRecipes(auth, db)) ?? []);
};

export const user = writable<User | null | undefined>(undefined);

export const initAll = () => {
  updateRecipes(); // not awaited
  const ends = [
    initToasts(),
    onAuthStateChanged(getFb().auth, async u => {
      user.set(u);
      await updateRecipes();
    }),
  ];
  const endAll = () => ends.map(f => f());
  return endAll;
};

export const toBePreviewed = writable<Recipe | undefined>(undefined);
export const toBeCooked = writable<Recipe | undefined>(undefined);
export const toBeEdited = writable<Recipe | undefined>(undefined);

const isKey = <T extends object>(
  obj: T,
  key: string,
): key is string & keyof T => Object.keys(obj).includes(key);

export const getByPath = (obj: unknown, path: string | undefined): unknown => {
  if (!path || !obj) {
    return obj;
  }
  const [parentPath, ...childPaths] = path.split(".");
  if (typeof obj === "object" && isKey(obj, parentPath)) {
    return getByPath(obj[parentPath], childPaths.join("."));
  }
  throw new Error(
    `tried to get path ${path} of object with keys ${Object.keys(obj)}`,
  );
};

const setByPath = (obj_: unknown, path: string, value: unknown): unknown => {
  if (!path || !obj_) {
    return value;
  }
  if (typeof obj_ !== "object") {
    throw new Error(`cannot set path ${path} of object ${obj_} to ${value}`);
  }
  const [parentPath, ...childPaths] = path.split(".");
  if (Array.isArray(obj_)) {
    const obj = [...obj_];
    const i = parseInt(parentPath);
    if (isNaN(i)) {
      throw new Error(
        `expected ${parentPath} to be a number because it indexes an array`,
      );
    }
    obj[i] = setByPath(obj[i], childPaths.join("."), value);
    return obj;
  }
  const obj: Record<string, unknown> = { ...obj_ };
  return {
    ...obj,
    [parentPath]: setByPath(obj[parentPath], childPaths.join("."), value),
  };
};

const addByPath = (obj: unknown, path: string, value: unknown) => {
  const paths = path.split(".");
  const parentPath = paths.slice(0, -1).join(".");
  const childPath = paths.slice(-1)[0];
  const x = getByPath(obj, parentPath);
  const i = parseInt(childPath);
  if (Array.isArray(x) && !isNaN(i)) {
    const before = x.slice(0, i + 1);
    const after = x.slice(i + 1);
    return setByPath(obj, parentPath, [...before, value, ...after]);
  } else {
    throw new Error(
      `can't add ${value} after index ${i} of ${x} at path ${path} of ${obj}`,
    );
  }
};

type Get<T extends object> = <K extends string & keyof T>(key: K) => T[K];

export class Editable<T extends object> implements Readable<Get<T>> {
  initial: T;
  data: T;
  isT: (x: unknown) => x is T;
  unread: Set<string & keyof T>;
  subscribers: ((value: Get<T>) => void)[];
  constructor(obj: T, isT: (x: unknown) => x is T) {
    this.initial = obj;
    this.data = { ...obj };
    this.isT = isT;
    this.unread = new Set(getKeys(obj));
    this.subscribers = [];
  }
  get<K extends string & keyof T>(key: K) {
    this.unread.delete(key);
    return this.data[key];
  }
  set<K extends string & keyof T>(key: K, value: T[K]) {
    this.data[key] = value;
    this.subscribers.forEach(s => s(k => this.get(k)));
    return this.data;
  }
  getUnread() {
    const keys = Array.from(this.unread);
    return keyValuesToObj(
      keys,
      keys.map(k => this.data[k]),
    ) as Partial<T>;
  }
  setByPath(path: string, value: unknown) {
    const x = setByPath(this.data, path, value);
    if (isRecord(x) && this.isT(x)) {
      this.data = x;
      this.subscribers.forEach(s => s(k => this.get(k)));
      return this.data;
    }
    throw new Error(`couldn't set data to ${x} of type ${typeof x}`);
  }
  addByPath(path: string, value: unknown) {
    const x = addByPath(this.data, path, value);
    if (isRecord(x) && this.isT(x)) {
      this.data = x;
      this.subscribers.forEach(s => s(k => this.get(k)));
      return this.data;
    }
    throw new Error(`couldn't set data to ${x} of type ${typeof x}`);
  }
  subscribe(run: (value: Get<T>) => void): () => void {
    run(k => this.get(k));
    this.subscribers.push(run);
    const i = this.subscribers.length - 1;
    return () => {
      this.subscribers[i] = () => {};
    };
  }
}
