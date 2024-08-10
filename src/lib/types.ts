import type { Rec } from "./Recipe";
import type { Call, Objects, Pipe, Strings, Tuples, Unions } from "hotscript";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Func<P extends unknown[] = any[], R = any> = (...args: P) => R;

export type ExtractEndsWith<T extends string, S extends string> = Pipe<
  T,
  [
    Unions.ToTuple, Tuples.Filter<Strings.EndsWith<S>>, Tuples.ToUnion
  ]
>;

export const isRecord = (x: unknown): x is Record<string, unknown> =>
  !!x && typeof x === "object" && !Array.isArray(x);

export interface Recipe extends Call<Objects.PartialDeep, Rec> {
  "@context": "https://schema.org";
  "@id": string;
  "@type": "Recipe";
}

export const isRecipe = (x: unknown): x is Recipe => {
  if (typeof x === "object") {
    const y = x as Recipe;
    return y["@context"] === "https://schema.org" && y["@type"] === "Recipe";
  }
  return false;
};

export const toRecipes = (x: unknown) => {
  if (Array.isArray(x) && x.every(r => isRecipe(r))) {
    return x;
  }
  throw new Error("invalid recipes");
};
