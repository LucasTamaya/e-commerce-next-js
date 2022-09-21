import { BASE_URL } from "src/utils/baseUrl";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import { IProduct } from "@/interfaces/*";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { products } = req.body;

  console.log(products);

  const lineItems: any[] = products.map((product: IProduct) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title,
        },
        unit_amount: product.price * 100, // to convert dollars to cents ,
      },
      quantity: 1,
    };
  });

  console.log(lineItems);

  try {
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
        cancel_url: `${BASE_URL}/cancel`,
      });
      return res.json({ url: session.url });
    }
  } catch (err: any) {
    console.log(err.message);
  }
}
