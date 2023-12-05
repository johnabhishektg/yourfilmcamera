"use client";

import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import { ToastAction } from "./ui/Toast";
import { AddToCartButton } from "./AddToCartButton";

type ProductItemsProps = {
  id: number;
  description: string | null;
  name: string;
  new: boolean | null;
  images: null;
  category: "cameras" | "lens" | "film rolls";
  price: string;
  createdAt: Date | null;
  key: number;
};

export default function ProductItems(product: ProductItemsProps) {
  const router = useRouter();
  const { toast } = useToast();

  function increaseCartItems(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      action: (
        // link to go to the checkout page
        <Link href="/">
          <ToastAction altText="View">View</ToastAction>
        </Link>
      ),
    });
  }

  return (
    <header className="border w-64 h-82 rounded shadow-md">
      <img
        className="relative w-full rounded-t h-40 object-cover cursor-pointer"
        src={product.images!}
        width={90}
        height={90}
        onClick={() => router.push(`/product/${product.id}`)}
      />
      <footer className="p-4">
        <p className="text-xs font-bold text-gray-400">NEW </p>
        <h2 className="mt-1 font-medium text-primary">{product.name}</h2>
        <div className="mt-2 flex justify-between items-center content-center">
          <p className="font-bold text-2xl">${product.price}</p>
          <AddToCartButton id={product.id} />
          {/* <Button onClick={(e) => increaseCartItems(e)}>Add to cart</Button> */}
        </div>
      </footer>
    </header>
  );
}
