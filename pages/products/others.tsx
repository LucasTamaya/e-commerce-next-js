import type { NextPage } from "next";
import ProductList from "@/components/Product/ProductList";

interface Props {}

const Others: NextPage<Props> = ({}) => {
  return <ProductList fetchDetails="categories/5/products" title="Others" />;
};

export default Others;
