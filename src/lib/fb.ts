import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./.env.json";

export const getFb = () => {
  try {
    const app = initializeApp(firebaseConfig);
    getAnalytics(app);
    const auth = getAuth(app);
    const db = getFirestore(app);
    return { auth, db };
  } catch (error) {
    if (`${error}`.includes("window is not defined")) {
      console.error("call fb from within onMount to ensure window is defined");
    }
    throw error;
  }
};
