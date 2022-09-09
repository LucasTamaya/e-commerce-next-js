import axios from "axios";
import type { NextPage, NextPageContext } from "next";
import Image from "next/image";

import { IProduct } from "@/interfaces/product";
import Button from "@/components/Button";

const Product: NextPage<IProduct> = ({
  id,
  title,
  price,
  description,
  image,
  rating,
}) => {
  return (
    <div className="w-full h-screen flex flex-row justify-center items-center">
      <div className="max-w-[1000px] flex items-center gap-x-10 mx-auto">
        <Image src={image} alt="product image" width={250} height={250} />
        <div className="flex-auto flex flex-col max-w-[700px] gap-y-3">
          <h3 className="font-bold text-xl">{title}</h3>
          <p>${price}</p>
          <p>{description}</p>
          <p className="font-bold">Rating: {rating.rate}/10</p>
          <Button filled={true}>Buy now</Button>
          <Button filled={false}>Add to cart</Button>
        </div>
      </div>
    </div>
  );
};

export default Product;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;

  const { data } = await axios.get(
    `https://fakestoreapi.com/products/${query.id}`
  );

  const { id, title, price, description, image, rating }: IProduct = data;

  return {
    props: {
      id,
      title,
      price,
      description,
      image,
      rating,
    },
  };
};
