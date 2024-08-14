import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "./stores";
import { isRecipe, isRecord } from "./types";
import { omit, toArray } from "./util";
import type { ShoppingListItem } from "./stores";
import type { Recipe, RecipeVersions } from "./types";
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
      const id = isRecord(source) ? source.id : undefined;
      const y = isRecord(source) ? source.recipeYield : undefined;
      const s: ShoppingListItem["source"] =
        type === "recipe" && typeof id === "string"
          ? { type, id, recipeYield: typeof y === "number" ? y : 1 }
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
) => setDoc(ref, data);

const safeUpdateDoc = <C extends "users">(
  ref: DocumentReference,
  data: C extends "users" ? Partial<UserData> : never,
) => updateDoc(ref, data);

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
    const ids = recipes.map(r => r.original["@id"]);
    if (ids.includes(recipe["@id"])) {
      throw new Error("you already have a version of that recipe");
    }
    return safeUpdateDoc(ref, { recipes: [{ original: recipe }, ...recipes] });
  }
};

export const deleteWholeRecipe = async (
  auth_: Auth | undefined,
  db_: Firestore | undefined,
  id: string | undefined,
) => {
  const { auth, db } = checkAuthAndDb(auth_, db_);
  const uid = checkUid(auth);
  const ref = doc(db, "users", uid);
  const userDoc = await getDoc(ref);
  const { recipes } = toUserData(userDoc.data() ?? {});
  return safeUpdateDoc(ref, {
    recipes: recipes.filter(r => r.original["@id"] !== id),
  });
};

export const deleteOriginalRecipe = async (
  auth_: Auth | undefined,
  db_: Firestore | undefined,
  id: string,
) => {
  const { auth, db } = checkAuthAndDb(auth_, db_);
  const uid = checkUid(auth);
  const ref = doc(db, "users", uid);
  const userDoc = await getDoc(ref);
  const { recipes } = toUserData(userDoc.data() ?? {});
  return safeUpdateDoc(ref, {
    recipes: recipes.map(r =>
      r.original["@id"] === id ? { original: r.edited ?? r.original } : r,
    ),
  });
};

export const deleteEditedRecipe = async (
  auth_: Auth | undefined,
  db_: Firestore | undefined,
  id: string,
) => {
  const { auth, db } = checkAuthAndDb(auth_, db_);
  const uid = checkUid(auth);
  const ref = doc(db, "users", uid);
  const userDoc = await getDoc(ref);
  const { recipes } = toUserData(userDoc.data() ?? {});
  return safeUpdateDoc(ref, {
    recipes: recipes.map(r =>
      r.original["@id"] === id ? omit(r, ["edited"]) : r,
    ),
  });
};

export const saveEditedRecipe = async (
  auth_: Auth | undefined,
  db_: Firestore | undefined,
  id: string,
  recipe: Recipe,
) => {
  const { auth, db } = checkAuthAndDb(auth_, db_);
  const uid = checkUid(auth);
  const ref = doc(db, "users", uid);
  const userDoc = await getDoc(ref);
  const { recipes } = toUserData(userDoc.data() ?? {});
  return safeUpdateDoc(ref, {
    recipes: recipes.map(r =>
      r.original["@id"] === id ? { ...r, edited: recipe } : r,
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
