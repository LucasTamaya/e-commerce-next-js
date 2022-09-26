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
import { useRouter } from "next/router";

import { useCheckout } from "../../src/hooks/useCheckout";
import LayoutBeforeChekout from "@/components/LayoutBeforeChekout";

interface Props {
  productData: IProduct;
}

const Product: NextPage<Props> = ({ productData }) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [product, setProduct] = useState(productData);
  const [productQuantity, setProductQuantity] = useState(1);

  const router = useRouter();

  const { id, title, price, description, images }: IProduct = product;

  // query hook to add product to cart
  const {
    mutate,
    isLoading,
    isError,
    isSuccess: addToCartSuccess,
    data,
  } = useAddProductToCart(id, productQuantity);

  // query hook to open the Stripe checkout
  const {
    mutate: openCheckout,
    data: openCheckoutData,
    isLoading: openCheckoutLoading,
    isError: openCheckoutError,
    isSuccess: openCheckoutSuccess,
  } = useCheckout([product]);

  // handle request's success and error
  useEffect(() => {
    if (addToCartSuccess || isError || openCheckoutError) {
      setOpenSnackBar(true);
    }
  }, [addToCartSuccess, isError, openCheckoutError]);

  // handle the checkout
  useEffect(() => {
    if (openCheckoutSuccess) {
      router.replace(openCheckoutData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCheckoutSuccess]);

  // handle when we change the quantity of product
  useEffect(() => {
    setProduct((prev) => {
      return {
        ...prev,
        quantity: productQuantity,
      };
    });
  }, [productQuantity]);

  // layout before the user is redirected to the stripe checkout page
  if (openCheckoutSuccess) {
    return (
      <>
        <LayoutBeforeChekout
          openCheckoutSuccess={openCheckoutSuccess}
          openSnackBar={openSnackBar}
          setOpenSnackBar={setOpenSnackBar}
        />
      </>
    );
  }

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
            <label htmlFor="quantity" className="font-bold">
              Select a quantity:
            </label>
            <input
              type="number"
              id="quantity"
              defaultValue={1}
              className="border border-black w-12 pl-4 py-1"
              onChange={(e) => setProductQuantity(e.target.valueAsNumber)}
            />
            <Button filled={true} onClick={openCheckout}>
              {!openCheckoutLoading ? <>Buy now</> : <>Loading</>}
            </Button>
            <Button filled={false} onClick={mutate}>
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

        {addToCartSuccess && (
          <SnackBar
            openSnackBar={openSnackBar}
            setOpenSnackBar={setOpenSnackBar}
            severity={data.error ? "warning" : "success"}
            message={data.message}
          />
        )}

        {openCheckoutError && (
          <SnackBar
            openSnackBar={openSnackBar}
            setOpenSnackBar={setOpenSnackBar}
            severity="error"
            message="Something went wrong"
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

  return {
    props: {
      productData: data,
    },
  };
};
