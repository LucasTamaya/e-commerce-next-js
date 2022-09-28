import Link from "next/link";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const [userAuth, setUserAuth] = useState(false);

  const [cookie, _, removeCookie] = useCookies(["userId"]);

  const handleSignOut = () => {
    removeCookie("userId", { path: "/" });
  };

  useEffect(() => {
    if (cookie.userId === undefined) {
      setUserAuth(false);
    } else {
      setUserAuth(true);
    }
  }, [cookie.userId, removeCookie]);

  if (!userAuth) {
    return (
      <nav>
        <ul className="flex flex-row items-center gap-x-5">
          <li className="text-white transition duration-150 hover:text-gray-500">
            <Link href="/sign-in">Sign-in</Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav>
      <ul className="flex flex-row items-center gap-x-5">
        <li className="text-white transition duration-150 hover:text-gray-500">
          <Link href="/">Best Foods</Link>
        </li>
        <li className="text-white transition duration-150 hover:text-gray-500">
          <Link href="/burgers">Burgers</Link>
        </li>
        <li className="text-white transition duration-150 hover:text-gray-500">
          <Link href="/pizzas">Pizzas</Link>
        </li>
        <li className="text-white transition duration-150 hover:text-gray-500">
          <Link href="/desserts">Desserts</Link>
        </li>
        <li
          className="text-white transition duration-150 cursor-pointer hover:text-gray-500"
          onClick={handleSignOut}
        >
          Sign-out
        </li>
        <li className="text-white transition duration-150 hover:text-gray-500">
          <Link href="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
