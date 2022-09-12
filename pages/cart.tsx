import axios from "axios";
import type { NextPage, NextPageContext } from "next";

interface Props {}

const Cart: NextPage<Props> = ({}) => {
  return (
    <div>
      <h2>My Cart</h2>
    </div>
  );
};

export default Cart;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;

  const { data } = await axios.get(
    `https://fakestoreapi.com/products/${query.id}`
  );

  return {
    props: {},
  };
};
