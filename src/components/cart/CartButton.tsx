import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "../ui/Sheet";
import { Button, buttonVariants } from "../ui/Button";
import React from "react";
import CartItem from "./CartItem";
import Link from "next/link";
import { Product } from "@/lib/types";

export default function CartButton({ cartLineItems, cartItems }: any) {
  const itemCount = cartLineItems.reduce(
    (total: number, item: { quantity: any }) => total + Number(item.quantity),
    0
  );

  const cartTotal = cartLineItems.reduce(
    (total: number, item: { quantity: number; price: any }) =>
      total + item.quantity * Number(item.price),
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
          {itemCount > 0 && (
            <span className="absolute bg-secondary rounded-full w-6 h-6 text-secondary-foreground flex items-center justify-center text-xs -top-2 -right-2">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="lg: w-full">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>
            {itemCount === 0 && (
              <div>
                <div className="col-span-9 mt-4 gap-2 rounded-md border-2 border-dashed border-gray-200 p-6 text-center flex items-center justify-center flex-col h-[200px] md:h-[150px]">
                  <h1 className="text-md font-medium text-primary tracking-tight">
                    Your cart is empty
                  </h1>
                </div>
                <SheetClose className="w-full">
                  <Button variant="default" className="mt-8 w-full text-sm">
                    Start shopping
                  </Button>
                </SheetClose>
              </div>
            )}
            {itemCount > 0 && (
              <div>
                {cartItems.map(
                  (item: React.JSX.IntrinsicAttributes & Product) => (
                    <CartItem key={item.id} {...item} />
                  )
                )}
                <hr className="bg-gray-500 border-t solid mt-6" />
                <div className="flex justify-between mt-6 text-right font-semibold text-xl">
                  <p className="text-primary">Subtotal</p>
                  <div className="text-primary">${cartTotal}</div>
                </div>
                <div className="mt-6 space-y-2">
                  <Link
                    className={buttonVariants({ className: "w-full" })}
                    href={"/"}
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
