import Image from "next/image";
import Link from "next/link";

import { IProductCard } from "../../interfaces";

const ProductCard: React.FC<IProductCard> = ({
  id,
  name,
  img,
  price,
  category,
}) => {
  return (
    <>
      <div className="flex justify-center items-center">
        <Image src={img} width={350} height={300} alt="product image" />
      </div>
      <div className="flex flex-row items-center justify-between">
        <p className="font-bold my-5 text-ellipsis overflow-hidden whitespace-nowrap">
          {name}
        </p>
        <p className="font-bold text-main-red">${price}</p>
      </div>

      <Link href={`/${category}/${id}`} role={"link"}>
        <a className="w-full block text-center text-main-red border-2 border-main-red rounded uppercase font-bold py-2 transition duration-200 mb-3 hover:text-white hover:bg-main-red ">
          Meal Details
        </a>
      </Link>
    </>
  );
};

export default ProductCard;
