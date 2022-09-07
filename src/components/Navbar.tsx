import type { NextPage } from "next";
import Link from "next/link";

interface Props {}

const Navbar: NextPage<Props> = ({}) => {
  return (
    <nav>
      <ul className="flex flex-row justify-evenly items-center py-10">
        <li>
          <Link href="/products/men">Men</Link>
        </li>
        <li>
          <Link href="/products/women">Women</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
