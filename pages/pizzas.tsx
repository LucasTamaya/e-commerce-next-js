import type { NextPage } from "next";

import ProductList from "@/components/Product/ProductList";

const Pizzas: NextPage = () => {
  return <ProductList category="pizzas" title="Pizzas" />;
};

export default Pizzas;
