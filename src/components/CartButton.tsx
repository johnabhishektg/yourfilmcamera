"use client";

import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetPrimitive,
} from "./ui/Sheet";
import { Button, buttonVariants } from "./ui/Button";
import { useShoppingCart } from "@/lib/store";
import React from "react";
import CartItem from "./CartItem";
import Link from "next/link";

export default function CartButton() {
  const { cart } = useShoppingCart();

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity!, 0);
  };

  const cartQuantity = cart.reduce(
    (quantity, item) => item.quantity! + quantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="relative cursor-pointer inline-flex items-center space-x-2 rounded-md px-2  h-auto lg:h-8  lg:px-3"
        >
          <ShoppingCart className=" w-4 h-4" />
          {cart.length > 0 && (
            <span className="absolute bg-secondary rounded-full w-6 h-6 text-secondary-foreground flex items-center justify-center text-xs -top-2 -right-2">
              {cartQuantity}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="lg: w-full">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>
            {cart.length === 0 && (
              <div>
                <div className="col-span-9 mt-4 gap-2 rounded-md border-2 border-dashed border-gray-200 p-6 text-center flex items-center justify-center flex-col h-[200px] md:h-[150px]">
                  <h1 className="text-md font-medium text-primary tracking-tight">
                    Your cart is empty
                  </h1>
                </div>
                <SheetPrimitive.Close className="w-full">
                  <Button variant="default" className="mt-8 w-full text-sm">
                    Start shopping
                  </Button>
                </SheetPrimitive.Close>
              </div>
            )}
            {cart.length > 0 && (
              <div>
                {cart.map((item) => (
                  <CartItem key={item.id} {...item} />
                ))}
                <hr className="bg-gray-500 border-t solid mt-6" />
                <div className="flex justify-between mt-6 text-right font-semibold text-xl">
                  <p className="text-primary">Subtotal</p>
                  <div className="text-primary">${calculateTotal()}</div>
                </div>
                <div className="mt-6 space-y-2">
                  <Link
                    className={buttonVariants({ className: "w-full" })}
                    href={"/checkout"}
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
