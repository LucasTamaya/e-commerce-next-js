import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { BASE_URL } from "src/utils/baseUrl";
import { IProduct } from "@/interfaces/*";

const fetchCheckout = async (products: IProduct[]) => {
  const { data } = await axios.post(`${BASE_URL}/api/checkout`, {
    products,
  });

  return data.url;
};

export const useCheckout = (products: IProduct[]) => {
  return useMutation(() => fetchCheckout(products));
};
