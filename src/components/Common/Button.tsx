import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  filled: boolean;
  onClick?: () => any;
}

const Button: React.FC<Props> = ({ children, filled, onClick }) => {
  return (
    <button
      className={`${
        filled ? "bg-black text-white" : "text-black border-2 border-black"
      } text-center uppercase py-2 w-full`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
