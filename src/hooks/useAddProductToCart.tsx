import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { BASE_URL } from "src/utils/urls";

const fetchAddProductToCart = async (
  productId: number,
  quantity: number
): Promise<any> => {
  const { data } = await axios.post(`${BASE_URL}/api/cart/add-product`, {
    productId,
    quantity,
  });

  return data;
};

export const useAddProductToCart = (productId: number, quantity: number) => {
  return useMutation(() => fetchAddProductToCart(productId, quantity));
};
