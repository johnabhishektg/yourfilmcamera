"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPrimitive,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { PenBox } from "lucide-react";

import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { useShoppingCart } from "@/lib/store";
import { Product } from "@/lib/slices/createProductSlice";

type EditButtonProps = {
  product: Product;
  productId: number;
};

const EditButton = ({ product, productId }: EditButtonProps) => {
  const { increaseCart, updateQuantity, removeFromCart } = useShoppingCart();

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
        <div className="flex items-center justify-center w-full mb-6">
          <Button
            variant="outline"
            onClick={() => increaseCart(product)}
            className="text-xl"
          >
            +
          </Button>
          <Input
            className=" mx-4 h-10 w-12 "
            type="number"
            placeholder="2"
            value={product.quantity}
          />
          {product.quantity === 1 ? (
            <Button
              variant="outline"
              onClick={() => removeFromCart(productId)}
              className="text-xl"
            >
              -
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => updateQuantity(productId, "decrease")}
              className="text-xl"
            >
              -
            </Button>
          )}
        </div>
        <DialogFooter className="flex justify-between gap-12 sm:justify-center">
          <Button
            onClick={() => removeFromCart(productId)}
            variant="destructive"
            className="hidden sm:block"
          >
            Remove
          </Button>
          <DialogPrimitive.Close>
            <Button className="h-9">Save changes</Button>
          </DialogPrimitive.Close>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditButton;
