"use client";

import React from "react";
import { Trash } from "lucide-react";
import { Button } from "../ui/Button";
import { toast } from "../ui/use-toast";
import { deleteCartItem } from "@/app/(actions)/cart";
import { CartItem } from "@/lib/types";

interface DeleteItemProps {
  item: CartItem;
}

export function DeleteItem({ item }: DeleteItemProps) {
  const [isPending, startTransition] = React.useTransition();

  return (
    <Button
      variant="outline"
      className="p-3 h-8"
      onClick={() => {
        startTransition(async () => {
          try {
            await deleteCartItem({
              productId: item.productId,
            });
            toast({
              title: "Removed from cart",
              variant: "destructive",
            });
          } catch (err) {
            throw err;
          }
        });
      }}
      disabled={isPending}
    >
      <Trash className="w-4 h-4" />
    </Button>
  );
}
