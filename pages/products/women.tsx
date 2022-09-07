import type { NextPage } from "next";
import ProductList from "src/components/Product/ProductList";

interface Props {}

const Women: NextPage<Props> = ({}) => {
  return <ProductList category="women's clothing" />;
};

export default Women;
