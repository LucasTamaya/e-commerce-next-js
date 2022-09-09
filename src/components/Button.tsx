import type { NextPage } from "next";

interface Props {
  children: string;
  filled: boolean;
}

const Button: NextPage<Props> = ({ children, filled }) => {
  return (
    <button
      className={`${
        filled ? "bg-black text-white" : "text-black border-2 border-black"
      } text-center uppercase py-2`}
    >
      {children}
    </button>
  );
};

export default Button;
