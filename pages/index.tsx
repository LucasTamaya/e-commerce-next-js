import type { NextPage } from "next";

import ProductList from "../src/components/Product/ProductList";

const Home: NextPage = () => {
  return (
    <main>
      <ProductList category="best-foods" title="Best Foods" />
    </main>
  );
};

export default Home;
