import type { NextPage } from "next";

import ProductList from "@/components/Product/ProductList";

const Desserts: NextPage = () => {
  return <ProductList category="desserts" title="Desserts" />;
};

export default Desserts;
