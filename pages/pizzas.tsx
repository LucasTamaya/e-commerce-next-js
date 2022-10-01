import type { NextPage } from "next";

import ProductList from "@/components/Product/ProductList";
import HeadStructure from "@/components/Common/HeadStructure";

const Pizzas: NextPage = () => {
  return (
    <>
      <HeadStructure
        title="NextFoodApp - Pizzas"
        content="Check out the most delicious pizzas from NextFoodApp and enjoy free delivery!"
      />
      <ProductList category="pizzas" title="Pizzas" />
    </>
  );
};

export default Pizzas;
