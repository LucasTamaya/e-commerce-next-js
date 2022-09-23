import type { NextPage } from "next";
import ProductList from "@/components/Product/ProductList";

interface Props {}

const Electronics: NextPage<Props> = ({}) => {
  return (
    <ProductList fetchDetails="categories/2/products" title="Electronics" />
  );
};

export default Electronics;
