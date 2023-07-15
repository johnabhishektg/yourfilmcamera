import { Aperture, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { Button, buttonVariants } from "./ui/Button";
import UserAuthButton from "./UserAuthButton";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <nav className="w-full z-10 top-0 bg-white nav fixed flex justify-between align-center px-10 py-6 shadow-md">
      <div className="flex items-center gap-8">
        <Link className="flex items-center space-x-1" href={"/"}>
          <Aperture />
          <h2 className="hidden font-bold cursor-pointer lg:inline-block">
            YourFilmCamera
          </h2>
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
        </ul>
      </div>

      <div className="space-x-4 flex justify-center items-center">
        <Button
          variant="outline"
          className="cursor-pointer inline-flex items-center space-x-2 justify-center rounded-md text-sm shadow-sm"
        >
          <ShoppingCart className="w-4 h-4" />
          {/* {quantity > 0 && (
            <span className="bg-primary rounded-full w-6 h-6 text-white flex items-center justify-center text-sm absolute -top-3 -right-3">
              {quantity}
            </span>
          )} */}
        </Button>
        <UserAuthButton />
      </div>
    </nav>
  );
};

export default Navbar;
