import type { NextPage } from "next";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  filled: boolean;
  onClick?: () => any;
}

const Button: NextPage<Props> = ({ children, filled, onClick }) => {
  return (
    <button
      className={`${
        filled ? "bg-black text-white" : "text-black border-2 border-black"
      } text-center uppercase py-2`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
