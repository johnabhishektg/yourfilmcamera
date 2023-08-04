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
          "cursor-pointer shadow font-medium h-8 px-2 lg:px-3 space-x-2 text-xs",
      })}
    >
      Sign In
    </Link>
  );
}
