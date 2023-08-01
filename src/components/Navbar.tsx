import { Aperture } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import UserAuthButton from "./UserAuthButton";
import React from "react";
import CartButton from "./CartButton";
import NavItems from "./NavItems";
import { currentUser } from "@clerk/nextjs";
import { Avatar } from "./ui/Avatar";

export default async function Navbar() {
  // const { userId } = auth();
  // return <div>User Id: {userId}</div>;
  const user = await currentUser();

  return (
    <nav className="w-full z-10 top-0 bg-white nav fixed flex justify-between align-center px-10 py-6 shadow-md">
      <div className="flex items-center gap-8">
        <Link className="flex items-center space-x-1" href={"/"}>
          <Aperture />
          <h2 className="hidden font-bold cursor-pointer lg:inline-block">
            YourFilmCamera
          </h2>
        </Link>
        <ul className="hidden list-none items-center justify-center md:flex">
          <NavItems />
        </ul>
      </div>

      <div className="space-x-4 flex justify-center items-center">
        <CartButton />
        {user ? <UserButton afterSignOutUrl="/" /> : <UserAuthButton />}
      </div>
    </nav>
  );
}
