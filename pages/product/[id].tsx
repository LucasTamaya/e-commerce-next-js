import axios from "axios";
import type { NextPage, NextPageContext } from "next";
import Image from "next/image";

import { IProduct } from "@/interfaces/index";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { BASE_URL } from "src/utils/baseUrl";

const Product: NextPage<IProduct> = ({
  id,
  title,
  price,
  description,
  image,
  rating,
}) => {
  const handleAddToCart = async (): Promise<any> => {
    const res = await axios.post(`${BASE_URL}/api/add-to-cart`, {
      id,
    });

    console.log(res);
  };

  return (
    <>
      <Header />
      <div className="w-full h-[80vh] flex flex-row justify-center items-center">
        <div className="max-w-[1000px] flex items-center gap-x-10 mx-auto">
          <Image src={image} alt="product image" width={250} height={250} />
          <div className="flex-auto flex flex-col max-w-[700px] gap-y-3">
            <h3 className="font-bold text-xl">{title}</h3>
            <p>${price}</p>
            <p>{description}</p>
            <p className="font-bold">Rating: {rating.rate}/10</p>
            <Button filled={true}>Buy now</Button>
            <Button filled={false} onClick={handleAddToCart}>
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </>
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
