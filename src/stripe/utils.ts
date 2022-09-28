import Stripe from "stripe";

import { BASE_URL } from "src/utils/urls";
import { ILineItems } from "../interfaces/index";

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
