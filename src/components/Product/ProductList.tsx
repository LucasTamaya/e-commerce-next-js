import type { NextPage } from "next";

import { useProductsByCategory } from "src/hooks/useProductsByCategory";
import Header from "../Header";
import ProductCard from "./ProductCard";

interface Props {
  category: string;
  title: string;
}

const ProductList: NextPage<Props> = ({ category, title }) => {
  const { isLoading, isError, isSuccess, data } =
    useProductsByCategory(category);

  return (
    <section>
      <Header />
      <h2
        role={"heading"}
        className="text-center text-3xl font-bold mb-12 mt-10"
      >
        {title}
      </h2>
      {isLoading && <p>Loading...</p>}

      {isError && <p>Something went wrong, please try again.</p>}

      {isSuccess && (
        <ul className="max-w-[1300px] grid grid-cols-3 gap-7 mx-auto">
          {data.map(({ id, title, image, price }) => (
            <li key={id}>
              <ProductCard id={id} title={title} image={image} price={price} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProductList;
