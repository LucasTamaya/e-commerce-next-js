import axios from "axios";
import type { NextPage, NextPageContext } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

import { IProduct } from "@/interfaces/index";
import Button from "@/components/Common/Button";
import Header from "@/components/Common/Header";
import { useAddProductToCart } from "src/hooks/useAddProductToCart";
import { SnackBar } from "@/components/Common/SnackBar";
import { PLATZI_API_BASE_URL } from "src/utils/urls";

const Product: NextPage<IProduct> = ({
  id,
  title,
  price,
  description,
  images,
}) => {
  const { mutate, isLoading, isError, isSuccess, data } =
    useAddProductToCart(id);

  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    if (isSuccess || isError) {
      setOpenSnackBar(true);
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Header />
      <div className="relative w-full h-[80vh] flex flex-row justify-center items-center">
        <div className="max-w-[1000px] flex items-center gap-x-10 mx-auto">
          <Image src={images[0]} alt="product image" width={250} height={250} />
          <div className="flex-auto flex flex-col max-w-[700px] gap-y-3">
            <h3 className="font-bold text-xl">{title}</h3>
            <p>${price}</p>
            <p>{description}</p>
            <Button filled={true}>Buy now</Button>
            <Button filled={false} onClick={() => mutate()}>
              {!isLoading ? <>Add to cart</> : <>Loading...</>}
            </Button>
          </div>
        </div>

        {isError && (
          <SnackBar
            openSnackBar={openSnackBar}
            setOpenSnackBar={setOpenSnackBar}
            severity="error"
            message="Something went wrong"
          />
        )}

        {isSuccess && (
          <SnackBar
            openSnackBar={openSnackBar}
            setOpenSnackBar={setOpenSnackBar}
            severity={data.error ? "warning" : "success"}
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
    `${PLATZI_API_BASE_URL}/products/${query.id}`
  );

  const { id, title, price, description, images }: IProduct = data;

  return {
    props: {
      id,
      title,
      price,
      description,
      images,
    },
  };
};
