import { FOOD_API_BASE_URL } from "./../utils/urls";
import axios from "axios";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { BASE_URL } from "src/utils/urls";
import Stripe from "stripe";
import { db } from "./firebase-config";
import { ILineItems, IFood } from "../interfaces/index";

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

export const getStripeSession = async (lineItems: ILineItems[]) => {
  if (process.env.STRIPE_API_KEY) {
    const stripe = new Stripe(process.env.STRIPE_API_KEY, {
      apiVersion: "2022-08-01",
      typescript: true,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${BASE_URL}/success`,
      cancel_url: `${BASE_URL}`,
    });

    return session.url;
  }
};
