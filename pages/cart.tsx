import Button from "@/components/Common/Button";
import Header from "@/components/Common/Header";
import ProductCard from "@/components/Product/ProductCard";
import { IProduct } from "@/interfaces/*";
import type { NextPage, NextPageContext } from "next";
import Link from "next/link";
import { getUserCartProductIds, getUserCartProducts } from "src/firebase/utils";

interface Props {
  cookie: boolean;
  products: IProduct[];
}

const Cart: NextPage<Props> = ({ cookie, products }) => {
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
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-center text-3xl font-bold mb-12 mt-10">My Cart</h2>

        {products.length === 0 && (
          <p className="text-center text-lg">Your cart is empty :(</p>
        )}

        {products.length > 0 && (
          <>
            <ul className="max-w-[1300px] grid grid-cols-3 gap-7 mx-auto">
              {products.map(({ id, title, image, price }) => (
                <li key={id}>
                  <ProductCard
                    id={id}
                    title={title}
                    image={image}
                    price={price}
                  />
                </li>
              ))}
            </ul>
            <Button filled={true}>Proceed to checkout</Button>
          </>
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

    if (!productIds) {
      return {
        props: {
          cookie: true,
          products: [],
        },
      };
    }

    const products = await getUserCartProducts(productIds);

    return {
      props: {
        cookie: true,
        products,
      },
    };
  } catch (err: any) {
    console.log(err.message);
  }
};
