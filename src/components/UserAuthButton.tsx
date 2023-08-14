"use client";

import { buttonVariants } from "./ui/Button";
import Link from "next/link";

export default async function UserAuthButton() {
  return (
    <Link
      href={"/sign-in"}
      className={buttonVariants({
        variant: "default",
        className:
          "cursor-pointer shadow font-medium px-2 space-x-2 text-xs h-auto lg:h-8 lg:px-3 ",
      })}
    >
      Sign In
    </Link>
  );
}
