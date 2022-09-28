import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { BASE_URL } from "src/utils/urls";
import { IFood, IProductCard } from "@/interfaces/*";

const fetchCheckout = async (products: IFood[] | IProductCard[]) => {
  const { data } = await axios.post(`${BASE_URL}/api/checkout`, {
    products,
  });

  console.log(data);

  return data.url;
};

export const useCheckout = (products: IFood[] | IProductCard[]) => {
  return useMutation(() => fetchCheckout(products));
};
