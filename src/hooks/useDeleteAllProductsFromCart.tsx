import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { BASE_URL } from "src/utils/baseUrl";

const fetchDeleteAllProductsFromCart = async () => {
  const { data } = await axios.put(`${BASE_URL}/api/cart/delete-all-products`);
  console.log(data);

  return data;
};

export const useDeleteAllProductsFromCart = () => {
  return useMutation(() => fetchDeleteAllProductsFromCart());
};
