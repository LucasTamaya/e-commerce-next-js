import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { BASE_URL } from "src/utils/urls";
import { IFood } from "../interfaces/index";

const fetchDeleteProductFromCart = async (
  productToDelete: IFood | undefined
): Promise<any> => {
  const { data } = await axios.post(`${BASE_URL}/api/cart/delete-product`, {
    productToDelete,
  });

  return data;
};

export const useDeleteProductFromCart = (
  productToDelete: IFood | undefined
) => {
  return useMutation(() => fetchDeleteProductFromCart(productToDelete));
};
