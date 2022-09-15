import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { BASE_URL } from "src/utils/baseUrl";

const fetchAddProductToCart = async (productId: number): Promise<any> => {
  const { data } = await axios.post(`${BASE_URL}/api/add-to-cart`, {
    productId,
  });

  return data;
};

export const useAddProductToCart = (productId: number) => {
  return useMutation(() => fetchAddProductToCart(productId));
};
