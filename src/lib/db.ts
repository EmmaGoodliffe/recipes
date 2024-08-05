import type { Auth } from "firebase/auth";
import {
  getDoc,
  doc,
  type Firestore,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "./stores";
import { isRecipe, type Recipe } from "./types";

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

const checkData = <T extends {}>(data: T | undefined, desc = "data") => {
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
    await setDoc(ref, { recipes: [recipe] });
  } else {
    const { recipes } = userDoc.data();
    if (Array.isArray(recipes) && recipes.every(r => isRecipe(r))) {
      const ids = recipes.map(r => r["@id"]);
      if (ids.includes(recipe["@id"])) {
        throw new Error("you already have that recipe");
      }
      await updateDoc(ref, { recipes: [...recipes, recipe] });
    } else {
      throw new Error("invalid existing recipes");
    }
  }
};
