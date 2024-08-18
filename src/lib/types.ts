import { toDur, unique } from "./util";
import type { Recipe_ } from "../../schemas/Recipe.gen";
import type { Call, Objects, Pipe, Strings, Tuples, Unions } from "hotscript";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Func<P extends unknown[] = any[], R = any> = (...args: P) => R;

export type ExtractEndsWith<T extends string, S extends string> = Pipe<
  T,
  [Unions.ToTuple, Tuples.Filter<Strings.EndsWith<S>>, Tuples.ToUnion]
>;

export const toArray = <T>(x: T | T[] | undefined | null) =>
  x === undefined || x === null ? [] : Array.isArray(x) ? x : [x];

export const isRecord = (x: unknown): x is Record<string, unknown> =>
  !!x && typeof x === "object" && !Array.isArray(x);

type RecipeSchema = Call<Objects.PartialDeep, Recipe_>;

type PickThenPartialDeep<T, K extends keyof T> = {
  [P in K]: Call<Objects.PartialDeep, T[P]>;
};

type RecipeExtension = PickThenPartialDeep<
  Recipe_,
  | "author"
  | "cookTime"
  | "dateModified"
  | "datePublished"
  | "description"
  | "name"
  // | "nutrition"
  | "prepTime"
  | "recipeIngredient"
  | "recipeInstructions"
  | "recipeYield"
  // | "suitableForDiet"
  | "totalTime"
  | "url"
> &
  Pick<RecipeSchema, "editor" | "image" | "publisher">;

export interface Recipe extends Omit<RecipeExtension, "recipeYield"> {
  author: { name: string; url?: string };
  description: string;
  editor?: { name: string; url?: string };
  image?: { url: string };
  publisher?: { name: string; url?: string };
  /** A list whose items are defined by schema.org as "a single ingredient used in the recipe" */
  recipeIngredient: string[];
  recipeInstructions: string[];
  recipeYield: number;
}

export type RecipeVersions = { original: Recipe; edited?: Recipe };

export const isRecipe = (x: unknown): x is Recipe => {
  if (isRecord(x) && typeof x.url === "string") {
    try {
      new URL(x.url);
      return true;
    } catch (error) {
      console.log(`caught error testing recipe's URL: ${error}`);
      return false;
    }
  }
  return false;
};

const randomAuthor = () => ({
  name: Math.random() > 0.5 ? "John Doe" : "Jane Doe",
});

const parseYield = (y: RecipeSchema["recipeYield"]) => {
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

export const toRecipe = (data: RecipeSchema): Recipe => {
  const url = data.url;
  if (!url) {
    throw new Error("Recipe had no URL");
  }
  const author = withName(data.author ?? data.creator) ?? randomAuthor();
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
  const editor = withName(data.editor);
  const firstImage = toArray(data.image)[0];
  const imageUrl =
    firstImage === undefined || typeof firstImage === "string"
      ? firstImage
      : firstImage.url;
  const image = imageUrl ? { url: imageUrl } : undefined;
  const name = data.name ?? data.headline ?? "unknown dish";
  const publisher = withName(data.publisher);
  const recipeIngredient = unique([
    ...toArray(data.recipeIngredient),
    ...toArray(data.ingredients),
  ]).filter(ing => ing !== undefined);
  const recipeInstructions = toArray(data.recipeInstructions)
    .map(ing => (ing === undefined || typeof ing === "string" ? ing : ing.text))
    .filter(ing => ing !== undefined);
  const recipeYield =
    parseYield(data.recipeYield) ?? parseYield(data.yield) ?? 1;
  return {
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
  };
};
