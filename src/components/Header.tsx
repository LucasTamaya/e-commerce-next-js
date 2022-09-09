import type { NextPage } from "next";
import Navbar from "./Navbar";

interface Props {}

const Header: NextPage<Props> = ({}) => {
  return (
    <header className="flex justify-between items-center px-16 py-7 bg-black">
      <h1 className="text-white font-bold text-4xl">Next-ecommerce</h1>
      <Navbar />
    </header>
  );
};

export default Header;
