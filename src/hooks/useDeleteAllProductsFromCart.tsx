import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { BASE_URL } from "src/utils/urls";

const fetchDeleteAllProductsFromCart = async () => {
  const { data } = await axios.put(
    `${BASE_URL}/api/cart/delete-after-checkout`
  );
  console.log(data);

  return data;
};

export const useDeleteAllProductsFromCart = () => {
  return useMutation(() => fetchDeleteAllProductsFromCart());
};
