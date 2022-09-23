import type { NextPage } from "next";

import ProductList from "../src/components/Product/ProductList";

const Home: NextPage = () => {
  return (
    <main>
      <ProductList fetchDetails="products" title="All products" />
    </main>
  );
};

export default Home;
