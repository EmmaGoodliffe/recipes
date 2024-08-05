import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, type Auth } from "firebase/auth";

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
    const analytics = getAnalytics(app);
    const auth = getAuth();
    return { auth };
  } catch (error) {
    if (`${error}`.includes("window is not defined")) {
      console.error("call fb from within onMount to ensure window is defined");
    }
    throw error;
  }
};
