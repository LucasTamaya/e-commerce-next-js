import { IFood } from "../interfaces/index";

export const getCartTotalAmount = (products: IFood[]) => {
  let totalAmount: number = 0;

  products.forEach((product: IFood) => {
    totalAmount += product.price * product.quantity;
  });

  return totalAmount;
};
