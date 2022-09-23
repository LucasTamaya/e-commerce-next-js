import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { IProduct } from "../interfaces";
import { PLATZI_API_BASE_URL } from "src/utils/urls";

const fetchProductsByCategory = async (
  fetchDetails: string
): Promise<IProduct[]> => {
  const { data } = await axios.get(`${PLATZI_API_BASE_URL}/${fetchDetails}`);

  const productsWithImage = data.filter((product: IProduct) => {
    if (
      product.images[0] !== "" &&
      product.images[0].indexOf("about-mision.png") === -1
    ) {
      return product;
    }
  });

  console.log(productsWithImage);

  return productsWithImage;
};

export const useProductsByCategory = (
  fetchDetails: string
): UseQueryResult<IProduct[]> => {
  return useQuery(["productsByCategory"], () =>
    fetchProductsByCategory(fetchDetails)
  );
};
