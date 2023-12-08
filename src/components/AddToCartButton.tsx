"use client";

import React from "react";
import { Button } from "./ui/Button";
import { toast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";
import { addToCart } from "@/app/(actions)/cart";
import Link from "next/link";
import { ToastAction } from "./ui/Toast";

export function AddToCartButton({ id, name }: any) {
  const [isPending, startTransition] = React.useTransition();

  const productId = id;
  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          try {
            await addToCart({
              productId,
              quantity: 1,
            });

            toast({
              title: "Added to cart",
              description: `${name} has been added to your cart`,
              action: (
                // link to go to the checkout page
                <Link href="/">
                  <ToastAction altText="View">View</ToastAction>
                </Link>
              ),
            });
          } catch (err) {
            throw err;
          }
        });
      }}
    >
      {isPending && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
      )}
      Add to cart
    </Button>
  );
}
