import type { NextPage } from "next";
import ProductList from "@/components/Product/ProductList";

interface Props {}

const Furniture: NextPage<Props> = ({}) => {
  return <ProductList fetchDetails="categories/3/products" title="Furniture" />;
};

export default Furniture;
