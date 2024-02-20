"use client";

import { createAccountLink } from "@/app/(actions)/stripe";
import { Lock } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { Button } from "./ui/Button";

interface CheckoutButtonProps {
  cartId: number;
}

async function AccountLinker(cartId: number) {
  return await createAccountLink({ cartId });
}
const CheckoutButton: FC<CheckoutButtonProps> = ({ cartId }) => {
  return (
    <Button aria-label="Checkout" onClick={() => AccountLinker(cartId)}>
      <Link className="flex gap-1" href={`/checkout/${cartId}`}>
        <Lock className="w-4 h-4 mr-1" />
        Checkout
      </Link>
    </Button>
  );
};

export default CheckoutButton;
