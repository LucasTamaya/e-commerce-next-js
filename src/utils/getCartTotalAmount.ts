import { IFood } from "../interfaces/index";

export const getCartTotalAmount = (products: IFood[], quantities: number[]) => {
  const productPrices = products.map((product) => product.price);

  // if quantitie available, we make the sum of all product prices and we mutliply by the quantity selected
  const totalAmount = productPrices.reduce(
    (prev, curr, index) => prev + curr * quantities[index]
  );

  console.log(totalAmount);

  return totalAmount;
};
