import { Aperture } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import UserAuthButton from "./UserAuthButton";
import React from "react";
import CartButton from "./cart/CartButton";
import NavItems from "./NavItems";
import { currentUser } from "@clerk/nextjs";
import { getCart, getCartItems } from "@/lib/fetchers/cart";
import { cookies } from "next/headers";

export default async function Navbar() {
  const user = await currentUser();
  const cartLineItems = await getCart();

  const cartId = cookies().get("cartId")?.value;
  const cartItems = await getCartItems({ cartId: Number(cartId) });

  return (
    <nav className="w-full z-10 top-0 bg-white nav fixed flex justify-between align-center px-10 py-3 border-b dark:bg-slate-950">
      <div className="flex items-center gap-8">
        <Link className="flex items-center space-x-1" href={"/"}>
          <Aperture />
          <h2 className="hidden font-bold cursor-pointer lg:inline-block">
            YourFilmCamera
          </h2>
        </Link>
        <ul className="hidden list-none items-center justify-center lg:flex">
          <NavItems />
        </ul>
      </div>

      <div className="space-x-4 flex justify-center items-center">
        <CartButton cartLineItems={cartLineItems} cartItems={cartItems} />
        {user ? <UserButton afterSignOutUrl="/" /> : <UserAuthButton />}
      </div>
    </nav>
  );
}
