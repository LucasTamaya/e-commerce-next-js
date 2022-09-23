import type { NextPage } from "next";
import ProductList from "@/components/Product/ProductList";

interface Props {}

const Clothes: NextPage<Props> = ({}) => {
  return <ProductList fetchDetails="categories/1/products" title="Clothes" />;
};

export default Clothes;
