import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { IProduct } from "../interfaces/product";

const fetchProductsByCategory = async (
  category: string
): Promise<IProduct[]> => {
  const { data } = await axios.get(
    `https://fakestoreapi.com/products/category/${category}`
  );

  return data;
};

export const useProductsByCategory = (
  category: string
): UseQueryResult<IProduct[]> => {
  return useQuery(["productsByCategory"], () =>
    fetchProductsByCategory(category)
  );
};
