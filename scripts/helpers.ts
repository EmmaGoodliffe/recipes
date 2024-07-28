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
) => {
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
