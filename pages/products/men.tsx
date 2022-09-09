import type { NextPage } from "next";
import ProductList from "@/components/Product/ProductList";

interface Props {}

const Men: NextPage<Props> = ({}) => {
  return <ProductList category="men's clothing" title="Men's Products" />;
};

export default Men;
