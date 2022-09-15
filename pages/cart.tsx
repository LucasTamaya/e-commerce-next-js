import ProductCard from "@/components/Product/ProductCard";
import { IProduct } from "@/interfaces/*";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import type { NextPage, NextPageContext } from "next";
import Link from "next/link";
import { db } from "src/firebase/firebase-config";
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
    <div>
      <h2 className="text-center text-3xl font-bold mb-12 mt-10">My Cart</h2>
      {products.map(({ id, title, image, price }) => (
        <li key={id}>
          <ProductCard id={id} title={title} image={image} price={price} />
        </li>
      ))}
    </div>
  );
};

export default Cart;

export const getServerSideProps = async (context: NextPageContext) => {
  const { req } = context;

  // FUTUR COMMIT POUR LA FONCTION DAJOUT AU PANIER

  // Ici, on va tester aussi si on a des cookies
  // si non on invite l'utilisateur a se connecter
  // si oui récupère tous les ids des produits dans firebase pour ensuite faire des appels apis pour récupérer les produits*

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
