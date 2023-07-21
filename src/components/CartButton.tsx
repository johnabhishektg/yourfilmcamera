"use client";

import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/Sheet";
import { Button } from "./ui/Button";

export default function CartButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer inline-flex items-center space-x-2 justify-center rounded-md text-sm shadow-sm"
        >
          <ShoppingCart className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you sure absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
  // <Button
  //   variant="outline"
  //   className="cursor-pointer inline-flex items-center space-x-2 justify-center rounded-md text-sm shadow-sm"
  // >

  /* {quantity > 0 && (
        <span className="bg-primary rounded-full w-6 h-6 text-white flex items-center justify-center text-sm absolute -top-3 -right-3">
        {quantity}
  </span>
  )} */

  // </Button>
}
