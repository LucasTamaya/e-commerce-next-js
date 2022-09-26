import Image from "next/image";
import Link from "next/link";

import { IProductCard } from "../../interfaces";

const ProductCard: React.FC<IProductCard> = ({ id, title, image, price }) => {
  return (
    <div className="relative">
      <p className="absolute top-5 left-5 font-bold">${price}</p>
      <div className="flex justify-center items-center">
        <Image src={image} width={220} height={250} alt="product image" />
      </div>
      <p className="text-left text-sm my-5 text-ellipsis overflow-hidden whitespace-nowrap">
        {title}
      </p>

      <Link href={`/product/${id}`} role={"link"}>
        <a className="w-full block text-center text-black border-2 border-black uppercase font-bold py-2 transition duration-200 mb-3 hover:text-white hover:bg-black ">
          See more
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
