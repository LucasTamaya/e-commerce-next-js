import type { NextApiRequest, NextApiResponse } from "next";
import { doc, setDoc } from "firebase/firestore";

import { db } from "src/firebase/firebase-config";

interface IData {
  error: boolean;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IData>
) {
  const { cookies } = req;

  if (!cookies.userId) {
    return res.json({ error: true, message: "Please sign-in first" });
  }

  // if cookie available, user cart products in firebase
  const docRef = doc(db, "users", cookies.userId);

  try {
    await setDoc(docRef, { cart: [] });
    return res.json({
      error: false,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(400).json({
      error: true,
      message: "Something went wrong",
    });
  }
}
