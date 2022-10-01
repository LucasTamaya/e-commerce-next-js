import type { NextPage } from "next";

import HeadStructure from "@/components/Common/HeadStructure";
import ProductList from "@/components/Product/ProductList";

const Home: NextPage = () => {
  return (
    <>
      <HeadStructure
        title="NextFoodApp - Best Foods"
        content="Check out the most delicious dishes from NextFoodApp and enjoy free delivery!"
      />
      <ProductList category="best-foods" title="Best Foods" />
    </>
  );
};

export default Home;
