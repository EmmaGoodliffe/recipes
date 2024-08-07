import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "./stores";
import { toRecipes } from "./types";
import type { Recipe } from "./types";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";

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
    return setDoc(ref, { recipes: [recipe] });
  } else {
    const recipes = toRecipes(userDoc.data().recipes);
    const ids = recipes.map(r => r["@id"]);
    if (ids.includes(recipe["@id"])) {
      throw new Error("you already have that recipe");
    }
    return updateDoc(ref, { recipes: [recipe, ...recipes] });
  }
};

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
  return toRecipes(userDoc.data()?.recipes);
};

export const deleteRecipe = async (
  auth_: Auth | undefined,
  db_: Firestore | undefined,
  id: string | undefined,
) => {
  const { auth, db } = checkAuthAndDb(auth_, db_);
  const uid = checkUid(auth);
  const ref = doc(db, "users", uid);
  const userDoc = await getDoc(ref);
  return updateDoc(ref, {
    recipes: toRecipes(userDoc.data()?.recipes).filter(r => r["@id"] !== id),
  });
};
