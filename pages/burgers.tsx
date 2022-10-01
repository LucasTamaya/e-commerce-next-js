import type { NextPage } from "next";

import ProductList from "@/components/Product/ProductList";
import HeadStructure from "@/components/Common/HeadStructure";

const Burgers: NextPage = () => {
  return (
    <>
      <HeadStructure
        title="NextFoodApp - Burgers"
        content="Check out the most delicious burgers from NextFoodApp and enjoy free delivery!"
      />
      <ProductList category="burgers" title="Burgers" />
    </>
  );
};

export default Burgers;
