import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { isRecipe, parseYield } from "./Recipe";
import { toast } from "./stores";
import { deepOmitUndefined, isRecord, toArray } from "./types";
import { omit } from "./util";
import type { Recipe, RecipeVersions } from "./Recipe";
import type { ShoppingListItem } from "./stores";
import type { Auth } from "firebase/auth";
import type { DocumentReference, Firestore } from "firebase/firestore";

const checkAuthAndDb = (auth: Auth | undefined, db: Firestore | undefined) => {
  if (!db) {
    throw new Error("no db");
  }
  if (!auth) {
    throw new Error("no auth");
  }
  return { auth, db };
};

const checkUid = (auth: Auth) => {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    toast("not logged in");
    throw new Error("no uid");
  }
  return uid;
};

const checkData = <T extends object>(data: T | undefined, desc = "data") => {
  if (!data) {
    throw new Error(`no ${desc}`);
  }
  return data;
};

type UserData = {
  recipes: { original: Recipe; edited?: Recipe }[];
  shopping_list: ShoppingListItem[];
};

const toUserData = (x: Record<string, unknown>): UserData => ({
  recipes: toArray(x.recipes)
    .filter(isRecord)
    .map(({ original, edited }) => {
      const rv: RecipeVersions | null = isRecipe(original)
        ? { original }
        : null;
      if (rv && isRecipe(edited)) {
        rv.edited = edited;
      }
      return rv;
    })
    .filter(r => !!r),
  shopping_list: toArray(x.shopping_list)
    .filter(isRecord)
    .map(({ value, source, bought, selected, deleted }) => {
      if (typeof value !== "string") {
        return undefined;
      }
      const type = isRecord(source) ? source.type : undefined;
      const url = isRecord(source) ? source.url : undefined;
      const y = isRecord(source) ? source.recipeYield : undefined;
      const s: ShoppingListItem["source"] =
        type === "recipe" && typeof url === "string"
          ? { type, url, recipeYield: parseYield(y) ?? 1 }
          : type === "custom"
            ? { type }
            : { type: "unknown" };
      return {
        value,
        source: s,
        bought: bought ? true : false,
        selected: selected ? true : false,
        deleted: deleted ? true : false,
      };
    })
    .filter(x => !!x),
});

const safeSetDoc = <C extends "users">(
  ref: DocumentReference,
  data: C extends "users" ? UserData : never,
) => setDoc(ref, deepOmitUndefined(data));

const safeUpdateDoc = <C extends "users">(
  ref: DocumentReference,
  data: C extends "users" ? Partial<UserData> : never,
) => updateDoc(ref, deepOmitUndefined(data));

export const getUserData = async (
  auth_: Auth | undefined,
  db_: Firestore | undefined,
) => {
  const { auth, db } = checkAuthAndDb(auth_, db_);
  const uid = auth.currentUser?.uid;
  if (!uid) {
    return null;
  }
  const ref = doc(db, "users", uid);
  const userDoc = await getDoc(ref);
  console.log("db read");
  return toUserData(userDoc.data() ?? {});
};

export const addRecipe = async (
  auth_: Auth | undefined,
  db_: Firestore | undefined,
  recipe_: Recipe | undefined,
) => {
  const { auth, db } = checkAuthAndDb(auth_, db_);
  const uid = checkUid(auth);
  const recipe = checkData(recipe_, "recipe");
  const ref = doc(db, "users", uid);
  const userDoc = await getDoc(ref);
  if (!userDoc.exists()) {
    return safeSetDoc<"users">(ref, {
      recipes: [{ original: recipe }],
      shopping_list: [],
    });
  } else {
    const { recipes } = toUserData(userDoc.data());
    const urls = recipes.map(r => r.original.url);
    if (urls.includes(recipe.url)) {
      throw new Error("you already have a version of that recipe");
    }
    return safeUpdateDoc(ref, { recipes: [{ original: recipe }, ...recipes] });
  }
};

export const deleteWholeRecipe = async (
  auth_: Auth | undefined,
  db_: Firestore | undefined,
  url: string | undefined,
) => {
  const { auth, db } = checkAuthAndDb(auth_, db_);
  const uid = checkUid(auth);
  const ref = doc(db, "users", uid);
  const userDoc = await getDoc(ref);
  const { recipes } = toUserData(userDoc.data() ?? {});
  return safeUpdateDoc(ref, {
    recipes: recipes.filter(r => r.original.url !== url),
  });
};

export const deleteOriginalRecipe = async (
  auth_: Auth | undefined,
  db_: Firestore | undefined,
  url: string,
) => {
  const { auth, db } = checkAuthAndDb(auth_, db_);
  const uid = checkUid(auth);
  const ref = doc(db, "users", uid);
  const userDoc = await getDoc(ref);
  const { recipes } = toUserData(userDoc.data() ?? {});
  return safeUpdateDoc(ref, {
    recipes: recipes.map(r =>
      r.original.url === url ? { original: r.edited ?? r.original } : r,
    ),
  });
};

export const deleteEditedRecipe = async (
  auth_: Auth | undefined,
  db_: Firestore | undefined,
  url: string,
) => {
  const { auth, db } = checkAuthAndDb(auth_, db_);
  const uid = checkUid(auth);
  const ref = doc(db, "users", uid);
  const userDoc = await getDoc(ref);
  const { recipes } = toUserData(userDoc.data() ?? {});
  return safeUpdateDoc(ref, {
    recipes: recipes.map(r =>
      r.original.url === url ? omit(r, ["edited"]) : r,
    ),
  });
};

export const saveEditedRecipe = async (
  auth_: Auth | undefined,
  db_: Firestore | undefined,
  url: string,
  recipe: Recipe,
) => {
  const { auth, db } = checkAuthAndDb(auth_, db_);
  const uid = checkUid(auth);
  const ref = doc(db, "users", uid);
  const userDoc = await getDoc(ref);
  const { recipes } = toUserData(userDoc.data() ?? {});
  return safeUpdateDoc(ref, {
    recipes: recipes.map(r =>
      r.original.url === url ? { ...r, edited: recipe } : r,
    ),
  });
};

export const saveShoppingList = async (
  auth_: Auth | undefined,
  db_: Firestore | undefined,
  shoppingList: ShoppingListItem[],
) => {
  const { auth, db } = checkAuthAndDb(auth_, db_);
  const uid = checkUid(auth);
  const ref = doc(db, "users", uid);
  return safeUpdateDoc(ref, {
    shopping_list: shoppingList.filter(item => !item.deleted),
  });
};
