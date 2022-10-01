import type { NextPage } from "next";

import ProductList from "@/components/Product/ProductList";
import HeadStructure from "@/components/Common/HeadStructure";

const Desserts: NextPage = () => {
  return (
    <>
      <HeadStructure
        title="NextFoodApp - Desserts"
        content="Check out the most delicious desserts from NextFoodApp and enjoy free delivery!"
      />
      <ProductList category="desserts" title="Desserts" />
    </>
  );
};

export default Desserts;
