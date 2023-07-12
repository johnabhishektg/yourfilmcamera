import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "./ui/Button";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <nav className="w-full z-10 top-0 bg-white nav fixed flex justify-between align-center px-10 py-6 shadow-md">
      <Link href={"/"}>
        <h1 className="cursor-pointer font-semibold text-lg antialiased text-primary sm:text-2xl">
          YourFilmCamera
        </h1>
      </Link>
      <ul className="list-none flex items-center justify-center ">
        <Link href={"/products"}>
          <li
            className={buttonVariants({
              variant: "ghost",
              className: "hidden text-lg font-bold sm:block ",
            })}
          >
            Products
          </li>
        </Link>
        <button className="ml-8 cursor-pointer relative">
          <ShoppingCart />
          {/* {quantity > 0 && (
            <span className="bg-primary rounded-full w-6 h-6 text-white flex items-center justify-center text-sm absolute -top-3 -right-3">
              {quantity}
            </span>
          )} */}
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
