import type { NextPage } from "next";

import { useProductsByCategory } from "src/hooks/useProductsByCategory";
import ProductCard from "./ProductCard";

interface Props {
  category: string;
}

const ProductList: NextPage<Props> = ({ category }) => {
  const { isLoading, isError, isSuccess, data } =
    useProductsByCategory(category);

  return (
    <section>
      <h2 role={"heading"}>Men&apos;s Products</h2>
      {isLoading && <p>Loading...</p>}

      {isError && <p>Something went wrong, please try again.</p>}

      {isSuccess && (
        <ul>
          {data.map(
            ({ id, title, image, price, rating, category, description }) => (
              <li key={id} role={"listitem"}>
                <ProductCard
                  id={id}
                  title={title}
                  image={image}
                  price={price}
                  rating={rating}
                  category={category}
                  description={description}
                />
              </li>
            )
          )}
        </ul>
      )}
    </section>
  );
};

export default ProductList;
