import { BASE_URL } from "src/utils/baseUrl";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import { ILineItems, IProduct } from "@/interfaces/*";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { products } = req.body;

  // const lineItems: ILineItems[] = products.map((product: IProduct) => {
  //   return {
  //     id: product.id,
  //     price: product.price.toString(),
  //     quantity: 1,
  //   };
  // });

  const lineItems: any[] = products.map((product: IProduct) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title,
        },
        // unit_amount: product.price,
        unit_amount: 1000,
      },
      quantity: 1,
    };
  });

  console.log(lineItems);

  const stripe = new Stripe(
    "sk_test_51HlHhPEudO3PtUGN0yy35QAtyqVWPbtI9dO71otFnN6oVm3UkAbDzAaZIGHf9Jcstm8DMPEKVtoYnBizwaUcujwF008N4Vr70P",
    {
      apiVersion: "2022-08-01",
      typescript: true,
    }
  );

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${BASE_URL}/success`,
      cancel_url: `${BASE_URL}/cancel`,
    });
    return res.json({ url: session.url });
  } catch (err: any) {
    console.log(err.message);
  }

  // const stripe = await getStripe();

  // const data = await stripe?.redirectToCheckout({
  //   mode: "payment",
  //   lineItems,
  //   successUrl: window.location.origin,
  //   cancelUrl: window.location.origin,

  // });

  // console.log(data);
}
