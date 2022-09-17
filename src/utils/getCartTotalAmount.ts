import { IProduct } from "../interfaces/index";

export const getCartTotalAmount = (products: IProduct[]) => {
  const productPrices = products.map((product) => product.price);

  const totalAmount = productPrices.reduce((prev, curr) => prev + curr);

  console.log(totalAmount);

  return totalAmount;
};
