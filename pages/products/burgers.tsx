import type { NextPage } from "next";

import ProductList from "@/components/Product/ProductList";

const Burgers: NextPage = () => {
  return <ProductList fetchDetail="burgers" title="Burgers" />;
};

export default Burgers;
