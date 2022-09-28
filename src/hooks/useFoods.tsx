import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { IFood } from "../interfaces";
import { FOOD_API_BASE_URL } from "src/utils/urls";

const fetchFoods = async (category: string): Promise<IFood[]> => {
  const { data } = await axios.get(`${FOOD_API_BASE_URL}/${category}`);

  console.log(data);

  return data;
};

export const useFoods = (category: string): UseQueryResult<IFood[]> => {
  return useQuery(["productsByCategory"], () => fetchFoods(category));
};
