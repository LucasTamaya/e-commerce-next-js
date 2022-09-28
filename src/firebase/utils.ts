import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "./firebase-config";
import { IFood } from "../interfaces/index";

export const createUserCart = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  setDoc(userRef, { cart: [] });
};

export const getUserCartData = async (userId: string): Promise<any> => {
  const docRef = doc(db, "users", userId);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const userCartData: IFood[] = docSnap.data().cart;

    return userCartData;
  }
};

export const getDocSnap = async (userId: string) => {
  const docRef = doc(db, "users", userId);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
};
