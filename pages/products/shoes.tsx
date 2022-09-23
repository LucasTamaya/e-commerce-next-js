import type { NextPage } from "next";
import ProductList from "@/components/Product/ProductList";

interface Props {}

const Shoes: NextPage<Props> = ({}) => {
  return <ProductList fetchDetails="categories/4/products" title="Shoes" />;
};

export default Shoes;
