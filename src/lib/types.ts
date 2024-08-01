import type { Rec } from "./Recipe";

export interface Recipe extends Rec {
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
