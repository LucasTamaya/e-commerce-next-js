import type { NextPage } from "next";
import Link from "next/link";

interface Props {}

const Navbar: NextPage<Props> = ({}) => {
  return (
    <nav>
      <ul className="flex flex-row items-center gap-x-5">
        <li className="text-white transition duration-150 hover:text-gray-500">
          <Link href="/products/clothes">Clothes</Link>
        </li>
        <li className="text-white transition duration-150 hover:text-gray-500">
          <Link href="/products/shoes">Shoes</Link>
        </li>
        <li className="text-white transition duration-150 hover:text-gray-500">
          <Link href="/products/electronics">Electronics</Link>
        </li>
        <li className="text-white transition duration-150 hover:text-gray-500">
          <Link href="/products/furniture">Furniture</Link>
        </li>
        <li className="text-white transition duration-150 hover:text-gray-500">
          <Link href="/products/others">Others</Link>
        </li>
        <li className="text-white transition duration-150 hover:text-gray-500">
          <Link href="/sign-in">Sign-in</Link>
        </li>
        <li className="text-white transition duration-150 hover:text-gray-500">
          <Link href="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
