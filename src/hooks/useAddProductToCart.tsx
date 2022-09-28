import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { BASE_URL } from "src/utils/urls";

const fetchAddProductToCart = async (
  id: string,
  name: string,
  img: string,
  price: number,
  category: string,
  quantity: number
): Promise<any> => {
  const { data } = await axios.post(`${BASE_URL}/api/cart/add-product`, {
    id,
    name,
    img,
    price,
    category,
    quantity,
  });

  return data;
};

export const useAddProductToCart = (
  id: string,
  name: string,
  img: string,
  price: number,
  category: string,
  quantity: number
) => {
  return useMutation(() =>
    fetchAddProductToCart(id, name, img, price, category, quantity)
  );
};
