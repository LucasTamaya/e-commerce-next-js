import { useFoods } from "src/hooks/useFoods";
import Header from "../Common/Header";
import ProductCard from "./ProductCard";

interface Props {
  category: string;
  title: string;
}

const ProductList: React.FC<Props> = ({ category, title }) => {
  const { isLoading, isError, isSuccess, data } = useFoods(category);

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
        <ul className="max-w-[1300px] grid grid-cols-1 gap-7 mx-auto px-20 lg:grid-cols-2 xl:grid-cols-3">
          {data.map(({ id, name, img, price }) => (
            <li key={id}>
              <ProductCard
                id={id}
                name={name}
                img={img}
                price={price}
                category={category}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProductList;
