import type { NextPage } from "next";
import Image from "next/image";

import { IProduct } from "../../interfaces/product";

const ProductCard: NextPage<IProduct> = ({
  id,
  title,
  image,
  price,
  rating,
  category,
  description,
}) => {
  return (
    <div key={id}>
      <p>{title}</p>
      <p>${price}</p>
      <Image src={image} width={150} height={150} alt="product image" />
      <p>{rating.rate}</p>
    </div>
  );
};

export default ProductCard;
