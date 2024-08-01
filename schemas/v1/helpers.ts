import { DeepPartialKey, PartialKey, R } from "./types";

const removeKvPair = <T extends R, K extends string>(
  obj: T,
  k: K,
  v: unknown,
): PartialKey<T, K> => {
  const result = { ...obj };
  if (result[k] === v) {
    delete result[k];
  }
  return result;
};

export const deepRemoveKvPair = <T extends R, K extends string>(
  obj: T,
  k: K,
  v: unknown,
): DeepPartialKey<T, K> => {
  const result = removeKvPair(obj, k, v);
  for (const key in result) {
    if (result[key] instanceof Array) {
      result[key] = result[key].map(x => deepRemoveKvPair(x, k, v));
    } else if (result[key] instanceof Object) {
      result[key] = deepRemoveKvPair(result[key], k, v);
    }
  }
  return result as DeepPartialKey<T, K>;
};

export const omit = <T extends {}, K extends string[]>(obj: T, keys: K) => {
  const result: Partial<T> = {};
  for (const key in obj) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result as Omit<T, K[number]>;
};

export const isR = (x: unknown): x is R =>
  typeof x === "object" && !Array.isArray(x) && x !== null;
