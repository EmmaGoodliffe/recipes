// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPBzkRo0qkqSG7j03pmQnPeeyzSLxhDlI",
  authDomain: "recipes-7ef89.firebaseapp.com",
  projectId: "recipes-7ef89",
  storageBucket: "recipes-7ef89.appspot.com",
  messagingSenderId: "682188114235",
  appId: "1:682188114235:web:5b2424c27e9ac08f874f1e",
  measurementId: "G-CJ2XG1EL7F",
};

export const getFb = () => {
  try {
    const app = initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);
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
