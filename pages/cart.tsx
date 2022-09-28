import type { NextPage, NextPageContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ProductCard from "@/components/Product/ProductCard";
import { IFood } from "@/interfaces/*";
import Button from "@/components/Common/Button";
import Header from "@/components/Common/Header";
import { getUserCartData } from "src/firebase/utils";
import { getCartTotalAmount } from "src/utils/getCartTotalAmount";
import { useDeleteProductFromCart } from "../src/hooks/useDeleteProductFromCart";
import { SnackBar } from "@/components/Common/SnackBar";
import { useCheckout } from "src/hooks/useCheckout";
import LayoutBeforeChekout from "@/components/LayoutBeforeChekout";

interface Props {
  cookie?: boolean;
  products: IFood[];
  totalAmount: number;
}

const Cart: NextPage<Props> = ({ cookie, products, totalAmount }) => {
  const [cartProducts, setCartProducts] = useState(products);
  const [cartTotalAmount, setCartTotalAmount] = useState(totalAmount);
  const [productToDelete, setProductToDelete] = useState<IFood>();
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const router = useRouter();

  // query hook to delete product
  const {
    mutate: deleteProduct,
    isError: deleteError,
    isSuccess: deleteSuccess,
  } = useDeleteProductFromCart(productToDelete);

  // query hook to open the Stripe checkout
  const {
    mutate: openCheckout,
    data: openCheckoutData,
    isLoading: openCheckoutLoading,
    isError: openCheckoutError,
    isSuccess: openCheckoutSuccess,
  } = useCheckout(cartProducts);

  // delete product in firebase backend
  useEffect(() => {
    // run the code only if a deleteProductId is available
    if (productToDelete) {
      deleteProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productToDelete]);

  // handle the checkout
  useEffect(() => {
    if (openCheckoutSuccess) {
      router.replace(openCheckoutData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCheckoutSuccess]);

  // handle if there are any errors when we delete a product or when whe proceed to checkout
  useEffect(() => {
    if (
      deleteError ||
      deleteSuccess ||
      openCheckoutError ||
      openCheckoutSuccess
    ) {
      setOpenSnackBar(true);
    }
  }, [deleteError, deleteSuccess, openCheckoutError, openCheckoutSuccess]);

  const handleDelete = async (id: string) => {
    cartProducts.forEach((product) => {
      if (product.id === id) {
        // update the cart amount
        setCartTotalAmount((prev) => prev - product.price * product.quantity);
        // get the product to delete
        setProductToDelete(product);
      }
    });

    // filter the array by deleting the product with correspondent id
    const updatedCartProducts = cartProducts.filter(
      (product) => product.id !== id
    );

    // update the cart products on the frontend
    setCartProducts(updatedCartProducts);
  };

  // if the user is not authenticated and try to open the cart page
  if (cookie === false) {
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
      <div className="px-20 pb-10 mx-auto">
        <h2 className="text-center text-3xl font-bold mb-12 mt-10">My Cart</h2>

        {/* if there are no products in the cart */}
        {cartProducts.length === 0 && (
          <p className="text-center text-lg">Your cart is empty :(</p>
        )}

        {/* if there are some products saved in the cart */}
        {cartProducts.length > 0 && (
          <>
            <p className="font-bold mb-5">
              Total amount: ${cartTotalAmount.toFixed(2)}
            </p>
            <ul className="grid grid-cols-3 gap-7 mx-auto mb-5">
              {cartProducts.map(({ id, name, img, price, category }) => (
                <li key={id}>
                  <ProductCard
                    id={id}
                    name={name}
                    img={img}
                    price={price}
                    category={category}
                  />
                  <Button filled={true} onClick={() => handleDelete(id)}>
                    Delete from cart
                  </Button>
                </li>
              ))}
            </ul>
            <Button filled={true} onClick={openCheckout}>
              {!openCheckoutLoading ? <>Checkout</> : <>Loading...</>}
            </Button>
          </>
        )}

        {/* Snackbar to show status message */}
        {deleteError ||
          (openCheckoutError && (
            <SnackBar
              openSnackBar={openSnackBar}
              setOpenSnackBar={setOpenSnackBar}
              severity="error"
              message="Something went wrong"
            />
          ))}

        {deleteSuccess && (
          <SnackBar
            openSnackBar={openSnackBar}
            setOpenSnackBar={setOpenSnackBar}
            severity="success"
            message="Product deleted from cart"
          />
        )}
      </div>
    </>
  );
};

export default Cart;

export const getServerSideProps = async (context: NextPageContext) => {
  const { req } = context;

  // if there is no cookie
  if (!req?.headers.cookie) {
    return {
      props: { cookie: false },
    };
  }

  // get the userId
  const userId = req.headers.cookie.slice(7);

  try {
    const products: IFood[] = await getUserCartData(userId);

    console.log(products);

    if (products?.length === 0) {
      return {
        props: {
          products,
        },
      };
    }

    const totalAmount = getCartTotalAmount(products);

    return {
      props: {
        products,
        totalAmount,
      },
    };
  } catch (err: any) {
    console.log(err.message);
  }
};
