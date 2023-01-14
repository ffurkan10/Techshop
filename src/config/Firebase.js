import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateCurrentUser,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2YEqnkWtjEsFh_RiIVYAwdMMDXcTRYvs",
  authDomain: "product-e6a15.firebaseapp.com",
  projectId: "product-e6a15",
  storageBucket: "product-e6a15.appspot.com",
  messagingSenderId: "939035632648",
  appId: "1:939035632648:web:bd47e4fe67878d65ebddbd",
  measurementId: "G-HJDE55YSLZ",
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const auth = getAuth(app);

export const signUp = async (name, email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
  await updateCurrentUser(auth, { displayName: name });
};

export const signIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};
