"use client";

import { deleteCartItem, updateCartItem } from "@/app/(actions)/cart";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/Button";
import { CartItem } from "@/lib/types";
import { Input } from "../ui/Input";
import { toast } from "../ui/use-toast";
import { catchError } from "@/lib/utils";

interface UpdateCartProps {
  cartLineItem: CartItem;
}

export function UpdateCart(item: UpdateCartProps) {
  const id = React.useId();
  const [isPending, startTransition] = React.useTransition();

  return (
    <div className="flex w-full items-center justify-between space-x-2 xs:w-auto xs:justify-normal">
      <div className="flex items-center">
        <Button
          id={`${id}-decrement`}
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-r-none"
          onClick={() => {
            startTransition(async () => {
              try {
                await updateCartItem({
                  productId: item.cartLineItem.productId,
                  quantity: Number(item.cartLineItem.quantity) - 1,
                });
              } catch (err) {
                catchError(err);
              }
            });
          }}
          disabled={isPending}
        >
          <MinusIcon className="h-3 w-3" aria-hidden="true" />
          <span className="sr-only">Remove one item</span>
        </Button>
        <Input
          id={`${id}-quantity`}
          type="number"
          min="0"
          className="h-8 w-14 rounded-none border-x-0"
          value={item.cartLineItem.quantity}
          onChange={(e: any) => {
            startTransition(async () => {
              try {
                await updateCartItem({
                  productId: item.cartLineItem.productId,
                  quantity: Number(e.target.value),
                });
              } catch (err) {
                catchError(err);
              }
            });
          }}
          disabled={isPending}
        />
        <Button
          id={`${id}-increment`}
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-l-none"
          onClick={() => {
            startTransition(async () => {
              try {
                await updateCartItem({
                  productId: item.cartLineItem.productId,
                  quantity: Number(item.cartLineItem.quantity) + 1,
                });
              } catch (err) {
                catchError(err);
              }
            });
          }}
          disabled={isPending}
        >
          <PlusIcon className="h-3 w-3" aria-hidden="true" />
          <span className="sr-only">Add one item</span>
        </Button>
      </div>
      <Button
        id={`${id}-delete`}
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => {
          startTransition(async () => {
            try {
              await deleteCartItem({
                productId: item.cartLineItem.productId,
              });
              toast({
                title: "Removed from cart",
                variant: "destructive",
              });
            } catch (err) {
              catchError(err);
            }
          });
        }}
        disabled={isPending}
      >
        <TrashIcon className="h-3 w-3" aria-hidden="true" />
        <span className="sr-only">Delete item</span>
      </Button>
    </div>
  );
}
