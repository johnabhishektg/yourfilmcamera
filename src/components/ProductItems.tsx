"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import { Product } from "@/lib/slices/createProductSlice";
import { useShoppingCart } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "./ui/Toast";
import { Sheet, SheetTrigger } from "./ui/Sheet";
import Link from "next/link";

export default function ProductItems(product: Product) {
  const router = useRouter();
  const { toast } = useToast();
  const { increaseCart } = useShoppingCart();

  function increaseCartItems() {
    increaseCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      action: (
        <Link href="/checkout">
          <ToastAction altText="View">View</ToastAction>
        </Link>
      ),
    });
  }

  return (
    <header className="border w-64 h-82 rounded shadow-md">
      <img
        className="relative w-full rounded-t h-40 object-cover cursor-pointer"
        src={product?.image}
        alt=""
        width={90}
        height={90}
        onClick={() => router.push(`/product/${product.id}`)}
      />
      <footer className="p-4">
        <p className="text-xs font-bold text-gray-400">NEW </p>
        <h2 className="mt-1 font-medium text-primary">{product.name}</h2>
        <div className="mt-2 flex justify-between items-center content-center">
          <p className="font-bold text-2xl">${product.price}</p>
          <Button onClick={() => increaseCartItems()}>Add to cart</Button>
        </div>
      </footer>
    </header>
  );
}
