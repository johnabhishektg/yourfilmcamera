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
import { Button } from "./ui/Button";
import { useShoppingCart } from "@/lib/store";
import React from "react";
import { Product } from "@/lib/slices/createProductSlice";

export default function CartButton() {
  const { cart } = useShoppingCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="relative cursor-pointer inline-flex items-center space-x-2 justify-center rounded-md  shadow-sm"
        >
          <ShoppingCart className=" w-4 h-4" />
          {cart.map.length > 0 &&
            cart.map((item) => (
              <span
                key={item.id}
                className="absolute bg-secondary rounded-full w-6 h-6 text-secondary-foreground flex items-center justify-center text-xs -top-2 -right-2"
              >
                {item.quantity}
              </span>
            ))}
        </Button>
      </SheetTrigger>
      <SheetContent className="lg: w-full">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>
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
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
