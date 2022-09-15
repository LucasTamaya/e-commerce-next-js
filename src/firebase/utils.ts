import axios from "axios";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export const createUserCart = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  setDoc(userRef, { cart: [] });
};

export const getUserCartProductIds = async (userId: string) => {
  const docRef = doc(db, "users", userId);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const productIds: number[] = docSnap.data().cart;

    if (productIds.length === 0) {
      return [];
    }
    return productIds;
  }
};

export const getUserCartProducts = async (productIds: number[]) => {
  const products = await Promise.all(
    productIds.map(async (id) => {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      console.log(data);
      return data;
    })
  );

  return products;
};
