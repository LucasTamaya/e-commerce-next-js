import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { BASE_URL } from "src/utils/urls";
import { IProduct } from "@/interfaces/*";

const fetchCheckout = async (products: IProduct[]) => {
  const { data } = await axios.post(`${BASE_URL}/api/checkout`, {
    products,
  });

  console.log(data);

  return data.url;
};

export const useCheckout = (products: IProduct[]) => {
  return useMutation(() => fetchCheckout(products));
};
