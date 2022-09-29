import Link from "next/link";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const [userAuth, setUserAuth] = useState(false);

  const [cookie, _, removeCookie] = useCookies(["userId"]);

  const router = useRouter();

  const handleSignOut = () => {
    removeCookie("userId", { path: "/" });
    router.push("/");
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
          <li className="text-white transition duration-150 hover:scale-110">
            <Link href="/sign-in">Sign-in</Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav>
      <ul className="flex flex-row items-center gap-x-5">
        <li className="text-white font-bold transition duration-150 hover:scale-110">
          <Link href="/">Best Foods</Link>
        </li>
        <li className="text-white font-bold transition duration-150 hover:scale-110">
          <Link href="/burgers">Burgers</Link>
        </li>
        <li className="text-white font-bold transition duration-150 hover:scale-110">
          <Link href="/pizzas">Pizzas</Link>
        </li>
        <li className="text-white font-bold transition duration-150 hover:scale-110">
          <Link href="/desserts">Desserts</Link>
        </li>
        <li
          className="text-white font-bold transition duration-150 cursor-pointer hover:scale-110"
          onClick={handleSignOut}
        >
          Sign-out
        </li>
        <li className="text-white font-bold transition duration-150 hover:scale-110">
          <Link href="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
