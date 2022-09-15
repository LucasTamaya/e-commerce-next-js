import axios from "axios";
import type { NextPage, NextPageContext } from "next";
import Image from "next/image";

import { IProduct } from "@/interfaces/index";
import Button from "@/components/Common/Button";
import Header from "@/components/Common/Header";
import { useAddProductToCart } from "src/hooks/useAddProductToCart";
import { useEffect, useState } from "react";
import { SnackBar } from "@/components/Common/SnackBar";

const Product: NextPage<IProduct> = ({
  id,
  title,
  price,
  description,
  image,
  rating,
}) => {
  const { mutate, isLoading, isError, isSuccess, data } =
    useAddProductToCart(id);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isSuccess || isError) {
      setOpen(true);
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Header />
      <div className="relative w-full h-[80vh] flex flex-row justify-center items-center">
        <div className="max-w-[1000px] flex items-center gap-x-10 mx-auto">
          <Image src={image} alt="product image" width={250} height={250} />
          <div className="flex-auto flex flex-col max-w-[700px] gap-y-3">
            <h3 className="font-bold text-xl">{title}</h3>
            <p>${price}</p>
            <p>{description}</p>
            <p className="font-bold">Rating: {rating.rate}/10</p>
            <Button filled={true}>Buy now</Button>
            <Button filled={false} onClick={() => mutate()}>
              {!isLoading ? <>Add to cart</> : <>Loading...</>}
            </Button>
          </div>
        </div>
        {isError && <>Something went wrong</>}
        {isSuccess && (
          <SnackBar
            open={open}
            setOpen={setOpen}
            error={data.error}
            message={data.message}
          />
        )}
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
