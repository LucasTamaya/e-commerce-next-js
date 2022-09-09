import type { NextPage } from "next";
import ProductList from "@/components/Product/ProductList";

interface Props {}

const Women: NextPage<Props> = ({}) => {
  return <ProductList category="women's clothing" title="Women's Products" />;
};

export default Women;
