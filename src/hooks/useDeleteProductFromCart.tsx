import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { BASE_URL } from "src/utils/urls";

const fetchDeleteProductFromCart = async (
  productId: number | undefined
): Promise<any> => {
  const { data } = await axios.post(`${BASE_URL}/api/cart/delete-product`, {
    productId,
  });

  return data;
};

export const useDeleteProductFromCart = (productId: number | undefined) => {
  return useMutation(() => fetchDeleteProductFromCart(productId));
};
