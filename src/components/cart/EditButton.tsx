"use client";

import { PenBox } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";

import { Button } from "../ui/Button";
import { UpdateCart } from "./update-cart";

const EditButton = ({ cartItems }: any) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="p-3 h-8">
          <PenBox className="cursor-pointer w-4 h-4 " />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit </DialogTitle>
          <DialogDescription>
            Change the quantity or remove this item from your cart.
          </DialogDescription>
        </DialogHeader>
        <UpdateCart cartLineItem={cartItems} />
      </DialogContent>
    </Dialog>
  );
};

export default EditButton;
