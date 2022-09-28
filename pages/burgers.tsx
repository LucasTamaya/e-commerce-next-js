import type { NextPage } from "next";

import ProductList from "@/components/Product/ProductList";

const Burgers: NextPage = () => {
  return <ProductList category="burgers" title="Burgers" />;
};

export default Burgers;
