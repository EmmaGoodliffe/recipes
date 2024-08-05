import type { Rec } from "./Recipe";
import type { Call, Objects } from "hotscript";

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
