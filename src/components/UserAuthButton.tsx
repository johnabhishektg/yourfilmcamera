"use client";

import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";

const UserAuthButton = ({}) => {
  const router = useRouter();
  return (
    <Button
      variant="default"
      className="cursor-pointer shadow font-medium space-x-2 lg:text-xs"
      onClick={() => router.push("/sign-in")}
    >
      Sign In
    </Button>
  );
};

export default UserAuthButton;
