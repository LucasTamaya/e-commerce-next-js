import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { createUserCart, getDocSnap } from "./utils";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export const signInWithProvider = async (
  provider: GoogleAuthProvider | FacebookAuthProvider
) => {
  try {
    const credentials = await signInWithPopup(auth, provider);

    const existingDocSnap = await getDocSnap(credentials.user.uid);

    if (!existingDocSnap) {
      await createUserCart(credentials.user.uid);
      return credentials.user.uid;
    } else {
      return credentials.user.uid;
    }
  } catch (err: any) {
    console.log(err.message);
    throw Error(err.message);
  }
};

export const signInWithEmailAndPasswordForm = async (
  email: string,
  password: string
) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);

    return credentials.user.uid;
  } catch (err: any) {
    console.log(err.message);
    throw Error(err.message);
  }
};

export const createUserWithEmailAndPasswordForm = async (
  email: string,
  password: string
) => {
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await createUserCart(credentials.user.uid);

    return credentials.user.uid;
  } catch (err: any) {
    console.log(err.message);
    throw Error(err.message);
  }
};
