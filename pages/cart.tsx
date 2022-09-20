import type { NextPage, NextPageContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ProductCard from "@/components/Product/ProductCard";
import { IProduct } from "@/interfaces/*";
import Button from "@/components/Common/Button";
import Header from "@/components/Common/Header";
import { getUserCartProductIds, getUserCartProducts } from "src/firebase/utils";
import { getCartTotalAmount } from "src/utils/getCartTotalAmount";
import { useDeleteProductFromCart } from "../src/hooks/useDeleteProductFromCart";
import { SnackBar } from "@/components/Common/SnackBar";
import axios from "axios";
import { BASE_URL } from "src/utils/baseUrl";

interface Props {
  cookie: boolean;
  products: IProduct[];
  totalAmount: number;
}

const Cart: NextPage<Props> = ({ cookie, products, totalAmount }) => {
  const [cartProducts, setCartProducts] = useState(products);
  const [cartTotalAmount, setCartTotalAmount] = useState(totalAmount);
  const [deleteProductId, setDeleteProductId] = useState<number>();
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const router = useRouter();

  console.log(cartProducts);

  const { mutate, isLoading, isError, isSuccess } =
    useDeleteProductFromCart(deleteProductId);

  useEffect(() => {
    // run the code only if a deleteProductId is available
    if (deleteProductId) {
      mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteProductId]);

  useEffect(() => {
    if (isSuccess || isError) {
      setOpenSnackBar(true);
    }
  }, [isSuccess, isError]);

  const handleDelete = async (idx: number) => {
    // filter the array with the index of the deleted product
    const updatedCartProducts = cartProducts.filter(
      (_, index) => index !== idx
    );
    setCartProducts(updatedCartProducts);
    setCartTotalAmount((prev) => prev - cartProducts[idx].price);
    setDeleteProductId(cartProducts[idx].id);
  };

  const handleCheckout = async () => {
    const { data } = await axios.post(`${BASE_URL}/api/checkout`, {
      products: cartProducts,
    });
    router.replace(data.url);
  };

  if (!cookie) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        <Link href="/sign-in">
          <button className="bg-black p-4 text-white rounded">
            Please sign-in first
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-[1200px] px-20 mx-auto">
        <h2 className="text-center text-3xl font-bold mb-12 mt-10">My Cart</h2>

        {cartProducts.length === 0 && (
          <p className="text-center text-lg">Your cart is empty :(</p>
        )}

        {cartProducts.length > 0 && (
          <>
            <p className="font-bold mb-5">
              Total amount: ${cartTotalAmount.toFixed(2)}
            </p>
            <ul className="max-w-[1200px] grid grid-cols-3 gap-7 mx-auto mb-5">
              {cartProducts.map(({ id, title, image, price }, idx) => (
                <li key={id}>
                  <ProductCard
                    id={id}
                    title={title}
                    image={image}
                    price={price}
                  />
                  <Button filled={true} onClick={() => handleDelete(idx)}>
                    {!isLoading ? <>Delete from cart</> : <>Loading...</>}
                  </Button>
                </li>
              ))}
            </ul>
            <Button filled={true} onClick={handleCheckout}>
              Proceed to checkout
            </Button>
          </>
        )}

        {isError && (
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

export default Cart;

export const getServerSideProps = async (context: NextPageContext) => {
  const { req } = context;

  if (!req?.headers.cookie) {
    return {
      props: { cookie: false },
    };
  }

  const userId = req.headers.cookie.slice(7);

  try {
    const productIds = await getUserCartProductIds(userId);

    if (!productIds || productIds?.length === 0) {
      return {
        props: {
          cookie: true,
          products: [],
        },
      };
    }

    const products = await getUserCartProducts(productIds);

    const totalAmount = getCartTotalAmount(products);

    return {
      props: {
        cookie: true,
        products,
        totalAmount,
      },
    };
  } catch (err: any) {
    console.log(err.message);
  }
};
