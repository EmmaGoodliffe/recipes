import { deepOmitUndefined, isRecord, toArray } from "./types";
import { areDeepEqual, decimalToString, pick, toDur, unique } from "./util";
import type { PickThenPartialDeep } from "./types";
import type { Recipe_ } from "../../schemas/Recipe.gen";
import type { Call, Objects } from "hotscript";

type RecipeSchema = Call<Objects.PartialDeep, Recipe_>;

const REQUIRED_KEYS = [
  "author",
  "cookTime",
  "dateModified",
  "datePublished",
  "description",
  "name",
  // "nutrition",
  "prepTime",
  "recipeIngredient",
  "recipeInstructions",
  "recipeYield",
  // "suitableForDiet",
  "totalTime",
  "url",
] as const;

type RecipeBase = PickThenPartialDeep<Recipe_, (typeof REQUIRED_KEYS)[number]> &
  RecipeSchema;

export interface Recipe extends RecipeBase {
  author: { name: string; url?: string };
  description: string;
  editor?: { name: string; url?: string };
  image?: { url: string };
  publisher?: { name: string; url?: string; logo?: string };
  /** A list whose items are defined by schema.org as "a single ingredient used in the recipe" */
  recipeIngredient: string[];
  recipeInstructions: string[];
  // recipeYield: number;
}

export type RecipeVersions = { original: Recipe; edited?: Recipe };

const randomAuthor = () => ({
  name: Math.random() > 0.5 ? "John Doe" : "Jane Doe",
});

export const parseYield = (y: unknown) => {
  if (typeof y === "number") {
    return y;
  }
  if (typeof y === "string") {
    const n = parseFloat(y);
    if (!isNaN(n)) {
      return n;
    }
    return undefined;
  }
  if (isRecord(y)) {
    const { value } = y;
    if (typeof value === "number") {
      return value;
    }
    if (typeof value === "string") {
      const n = parseFloat(value);
      if (!isNaN(n)) {
        return n;
      }
    }
  }
  return undefined;
};

const withName = <T extends { name?: string }>(obj: T | undefined) =>
  obj && obj.name ? { ...obj, name: obj.name } : undefined;

const first = <T>(x: T | T[] | null | undefined): T | undefined =>
  toArray(x)[0];

export const toRecipe = (data: RecipeSchema): Recipe => {
  const url = data.url;
  if (!url) {
    throw new Error("Recipe had no URL");
  }
  try {
    new URL(url);
  } catch (error) {
    console.error(error);
    throw new Error(`invalid recipe url: ${url}`);
  }
  const author = withName(first(data.author ?? data.creator)) ?? randomAuthor();
  const prepTime = data.prepTime ?? toDur({ h: 0, m: 10 });
  const cookTime = data.cookTime ?? toDur({ h: 0, m: 10 });
  const totalTime = data.totalTime ?? toDur({ h: 0, m: 20 });
  const now = new Date().toISOString();
  const dateModified = data.dateModified ?? now;
  const datePublished = data.datePublished ?? now;
  const descriptionLines = toArray(data.description).filter(x => x);
  const description =
    (descriptionLines.length ? descriptionLines.join("\n") : undefined) ??
    data.text ??
    "";
  const editor = withName(first(data.editor));
  const firstImage = first(data.image);
  const imageUrl =
    firstImage === undefined || typeof firstImage === "string"
      ? firstImage
      : firstImage.url;
  const image = imageUrl ? { url: imageUrl } : undefined;
  const name = data.name ?? data.headline ?? "unknown dish";
  const pub = withName(first(data.publisher));
  const pubLogo = pub && "logo" in pub ? first(pub.logo) : undefined;
  const pubLogoUrl = isRecord(pubLogo) ? pubLogo.url : pubLogo;
  const publisher = isRecord(pub) ? { ...pub, logo: pubLogoUrl } : pub;
  const recipeIngredient = unique([
    ...toArray(data.recipeIngredient),
    ...toArray(data.ingredients),
  ]).filter(ing => ing !== undefined);
  const recipeInstructions = toArray(data.recipeInstructions)
    .map(ing => (ing === undefined || typeof ing === "string" ? ing : ing.text))
    .filter(ing => ing !== undefined);
  const recipeYield = decimalToString(
    parseYield(data.recipeYield) ?? parseYield(data.yield) ?? 1,
  );
  return deepOmitUndefined({
    ...data,
    author,
    cookTime,
    dateModified,
    datePublished,
    description,
    editor,
    image,
    name,
    prepTime,
    publisher,
    recipeIngredient,
    recipeInstructions,
    recipeYield,
    totalTime,
    url,
  });
};

export const isRecipe = (x: unknown): x is Recipe => {
  if (!isRecord(x)) {
    return false;
  }
  const y: RecipeSchema = x;
  const requiredPart = pick(y, REQUIRED_KEYS);
  const normalised = pick(toRecipe(requiredPart), REQUIRED_KEYS);
  return areDeepEqual(requiredPart, normalised);
};
