import type { NextPage } from "next";
import ProductList from "src/components/Product/ProductList";

interface Props {}

const Men: NextPage<Props> = ({}) => {
  return <ProductList category="men's clothing" />;
};

export default Men;
