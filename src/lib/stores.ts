import { onAuthStateChanged } from "firebase/auth";
import { writable } from "svelte/store";
import { getFb } from "../routes/fb";
import { getUserData } from "./db";
import { parseIngredient } from "./nlp";
import { isRecord } from "./types";
import {
  areDeepEqual,
  decimalToString,
  deepUnique,
  getKeys,
  keyValuesToObj,
  sum,
  toIngredient,
  unique,
} from "./util";
import type { Func, Recipe, RecipeVersions } from "./types";
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

export const user = writable<User | null | undefined>(undefined);

export const recipes = writable<
  { original: Recipe; edited?: Recipe }[] | undefined
>(undefined);

export type ShoppingListItem = {
  value: string;
  source:
    | { type: "recipe"; id: string; recipeYield: number }
    | { type: "unknown" }
    | { type: "custom" };
  bought: boolean;
  selected: boolean;
  deleted: boolean;
};

const ingredientToShoppingListItem = (
  ingredient: string,
  source: Partial<ShoppingListItem["source"]> = {},
): ShoppingListItem => {
  const fullSource: ShoppingListItem["source"] =
    source.type === "recipe" && source.id
      ? { type: "recipe", id: source.id, recipeYield: source.recipeYield ?? 1 }
      : source.type === "custom"
        ? { type: "custom" }
        : { type: "unknown" };
  return {
    value: ingredient,
    source: fullSource,
    bought: false,
    selected: false,
    deleted: false,
  };
};

const toBareItem = ({
  parsed,
  source,
}: {
  parsed: ReturnType<typeof parseIngredient>;
  source: ShoppingListItem["source"];
}) => ({
  itemValue: parsed.item.map(({ value }) => value).join(" "),
  sourceId: source.type === "recipe" ? source.id : null,
});

export const addIngredientsToShoppingList = (
  list: ShoppingListItem[],
  ingredients: (string | undefined)[],
  source: Partial<ShoppingListItem["source"]> = {},
) => {
  const newItems = ingredients
    .filter(ing => ing !== undefined)
    .map(ing => ingredientToShoppingListItem(ing, source));
  const items = [...list, ...newItems]
    .filter(item => !item.deleted)
    .map(item => ({
      ...item,
      parsed: parseIngredient(item.value),
    }));
  const uniqueBareItems = deepUnique(items.map(item => toBareItem(item)));
  return uniqueBareItems
    .map(bare => items.filter(item => areDeepEqual(toBareItem(item), bare)))
    .map(items => {
      const numbers = items.map(item => {
        const [min, max] = (item.parsed.number ?? "").split("-");
        return {
          min: parseFloat(min),
          max: max ? parseFloat(max) : parseFloat(min),
        };
      });
      const totalMin = decimalToString(sum(numbers.map(n => n.min)));
      const totalMax = decimalToString(sum(numbers.map(n => n.max)));
      const totalNumber =
        totalMin === totalMax ? totalMin : `${totalMin}-${totalMax}`;
      const totalAmount = totalNumber === "0" ? "" : totalNumber;
      const totalUnit = unique(
        items.map(item => item.parsed.unit).filter(unit => unit),
      ).join("/");
      const totalItem = items[0].parsed.item
        .map(({ value }) => value)
        .join(" ");
      const totalDescription = unique(
        items
          .map(item =>
            item.parsed.description.map(({ value }) => value).join(" "),
          )
          .filter(item => item),
      ).join("; ");
      const totalValue = toIngredient(
        parseIngredient(
          `${totalAmount} ${totalUnit} ${totalItem}, ${totalDescription}`,
        ),
      );
      const totalYield = sum(
        items.map(item =>
          item.source.type === "recipe" ? item.source.recipeYield : 1,
        ),
      );
      return ingredientToShoppingListItem(
        totalValue,
        items[0].source.type === "recipe"
          ? { ...items[0].source, recipeYield: totalYield }
          : items[0].source,
      );
    });
};

export const shoppingList = writable<ShoppingListItem[][]>([]);

export const toBePreviewed = writable<RecipeVersions | undefined>(undefined);
export const toBeCooked = writable<RecipeVersions | undefined>(undefined);
export const toBeEdited = writable<RecipeVersions | undefined>(undefined);

export const updateData = async () => {
  const { auth, db } = getFb();
  const data = await getUserData(auth, db);
  const dbList = data?.shopping_list ?? [];
  recipes.set(data?.recipes ?? []);
  shoppingList.update(l => [deepUnique([...l.flat(), ...dbList])]);
};

export const initAll = () => {
  updateData(); // not awaited
  const ends = [
    initToasts(),
    onAuthStateChanged(getFb().auth, async u => {
      user.set(u);
      await updateData();
    }),
  ];
  const endAll = () => ends.map(f => f());
  return endAll;
};

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

const deleteByPath = (obj: unknown, path: string) => {
  const paths = path.split(".");
  const parentPath = paths.slice(0, -1).join(".");
  const childPath = paths.slice(-1)[0];
  const x = getByPath(obj, parentPath);
  const i = parseInt(childPath);
  if (Array.isArray(x) && !isNaN(i)) {
    const before = x.slice(0, i);
    const after = x.slice(i + 1);
    return setByPath(obj, parentPath, [...before, ...after]);
  } else {
    throw new Error(
      `can't delete index ${i} of ${x} at path ${path} of ${obj}`,
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
  setWhole(x: unknown) {
    if (isRecord(x) && this.isT(x)) {
      this.data = x;
      this.subscribers.forEach(s => s(k => this.get(k)));
      return this.data;
    }
    throw new Error(`couldn't set data to ${x} of type ${typeof x}`);
  }
  setByPath(path: string, value: unknown) {
    return this.setWhole(setByPath(this.data, path, value));
  }
  addByPath(path: string, value: unknown) {
    return this.setWhole(addByPath(this.data, path, value));
  }
  deleteByPath(path: string) {
    return this.setWhole(deleteByPath(this.data, path));
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
