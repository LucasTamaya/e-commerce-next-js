import type { NextApiRequest, NextApiResponse } from "next";

import { IProduct } from "@/interfaces/*";
import { ILineItems } from "../../src/interfaces/index";
import { getStripeSession } from "../../src/firebase/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { products } = req.body;

  // format the data according to stripe
  const lineItems: ILineItems[] = products.map((product: IProduct) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title,
        },
        unit_amount: product.price * 100, // convert dollars to cents ,
      },
      quantity: 1,
    };
  });

  try {
    const session = await getStripeSession(lineItems);

    return res.json({ url: session });
  } catch (err: any) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
}
