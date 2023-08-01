"use client";

import { buttonVariants } from "./ui/Button";
import Link from "next/link";

export default async function UserAuthButton() {
  return (
    <Link
      href={"/sign-in"}
      className={buttonVariants({
        variant: "default",
        className: "cursor-pointer shadow font-medium space-x-2 lg:text-xs",
      })}
    >
      Sign In
    </Link>
  );
}
