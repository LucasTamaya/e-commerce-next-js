import PulseLoader from "react-spinners/PulseLoader";

import { useFoods } from "src/hooks/useFoods";
import ProductCard from "./ProductCard";

interface Props {
  category: string;
  title: string;
}

const ProductList: React.FC<Props> = ({ category, title }) => {
  const { isLoading, isError, isSuccess, data } = useFoods(category);

  return (
    <main>
      <h1
        role={"heading"}
        className="text-center text-3xl text-main-red font-bold mb-12 mt-10"
      >
        {title}
      </h1>

      {isLoading && (
        <div className="w-full h-20 flex flex-row justify-center items-center">
          <PulseLoader color="#e63b60" size={20} />
        </div>
      )}

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
    </main>
  );
};

export default ProductList;
