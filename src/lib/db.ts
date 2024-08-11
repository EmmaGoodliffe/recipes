import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "./stores";
import { isRecipe, isRecord } from "./types";
import { toArray } from "./util";
import type { Recipe } from "./types";
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

type UserData = { recipes: { original: Recipe; edited?: Recipe }[] };

const toUserData = (x: Record<string, unknown>): UserData => ({
  recipes: toArray(x.recipes)
    .filter(isRecord)
    .map(({ original, edited }) =>
      isRecipe(original)
        ? { original, edited: isRecipe(edited) ? edited : undefined }
        : null,
    )
    .filter(r => !!r),
});

const safeSetDoc = <C extends "users">(
  ref: DocumentReference,
  data: C extends "users" ? UserData : never,
) => setDoc(ref, data);

const safeUpdateDoc = <C extends "users">(
  ref: DocumentReference,
  data: C extends "users" ? Partial<UserData> : never,
) => updateDoc(ref, data);

export const getRecipes = async (
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
  const { recipes } = toUserData(userDoc.data() ?? {});
  return recipes;
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
    return safeSetDoc<"users">(ref, { recipes: [{ original: recipe }] });
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
