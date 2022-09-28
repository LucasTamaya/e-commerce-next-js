import type { NextApiRequest, NextApiResponse } from "next";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "src/firebase/firebase-config";

interface IData {
  error: boolean;
  message: string;
  userId?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IData>
) {
  const { body, cookies } = req;

  if (!cookies.userId) {
    return res.json({ error: true, message: "Please sign-in first" });
  }

  // if cookie available, delete product from firebase
  const docRef = doc(db, "users", cookies.userId);

  try {
    await updateDoc(docRef, {
      cart: arrayRemove({ id: body.productId }),
    });
    return res.json({
      error: false,
      message: "Product correctly deleted",
      userId: cookies.userId,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(400).json({
      error: true,
      message: "Something went wrong",
    });
  }
}
