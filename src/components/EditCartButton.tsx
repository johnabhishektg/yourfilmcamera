"use client";

import { updateCartItem } from "@/app/(actions)/cart";
import { MinusIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/Button";

export function UpdateCart(productId: any, quantity: number) {
  const id = React.useId();
  const [isPending, startTransition] = React.useTransition();

  return (
    <div>
      <Button
        id={`${id}-decrement`}
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-r-none"
        onClick={() => {
          startTransition(async () => {
            try {
              await updateCartItem({
                productId: productId,
                quantity: quantity - 1,
              });
            } catch (err) {
              throw err;
            }
          });
        }}
        disabled={isPending}
      >
        <MinusIcon className="h-3 w-3" aria-hidden="true" />
        <span className="sr-only">Remove one item</span>
      </Button>
    </div>
  );
}
