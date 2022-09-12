import type { NextPage } from "next";
import Link from "next/link";

interface Props {}

const Navbar: NextPage<Props> = ({}) => {
  return (
    <nav>
      <ul className="flex flex-row items-center gap-x-5">
        <li className="text-white transition duration-150 hover:text-gray-500">
          <Link href="/products/men">Men</Link>
        </li>
        <li className="text-white transition duration-150 hover:text-gray-500">
          <Link href="/products/women">Women</Link>
        </li>
        <li className="text-white transition duration-150 hover:text-gray-500">
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
