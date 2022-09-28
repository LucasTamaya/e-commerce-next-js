import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { BASE_URL } from "src/utils/urls";

const fetchAddProductToCart = async (
  id: number,
  name: string,
  img: string,
  price: number,
  quantity: number
): Promise<any> => {
  const { data } = await axios.post(`${BASE_URL}/api/cart/add-product`, {
    id,
    name,
    img,
    price,
    quantity,
  });

  return data;
};

export const useAddProductToCart = (
  id: number,
  name: string,
  img: string,
  price: number,
  quantity: number
) => {
  return useMutation(() =>
    fetchAddProductToCart(id, name, img, price, quantity)
  );
};
