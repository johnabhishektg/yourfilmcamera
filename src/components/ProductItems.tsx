"use client";

import { useRouter } from "next/navigation";
import { AddToCartButton } from "./cart/add-item";
import Link from "next/link";

type ProductItemsProps = {
  id: number;
  description: string | null;
  name: string;
  new: boolean | null;
  images: null;
  category: "cameras" | "lens" | "film rolls";
  price: string;
  key: number;
};

export default function ProductItems(product: ProductItemsProps) {
  const router = useRouter();

  return (
    <header className="border w-64 h-82 rounded shadow-md dark:shadow-slate-900">
      <img
        className="relative w-full rounded-t h-40 object-cover cursor-pointer"
        src={product.images!}
        width={90}
        height={90}
        onClick={() => router.push(`/product/${product.id}`)}
      />
      <footer className="p-4">
        <p className="text-xs font-bold text-gray-400">NEW </p>
        <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/product/${product.id}`}>
          <h2 className="mt-1 font-medium text-primary">{product.name}</h2>
        </Link>
        <div className="mt-2 flex justify-between items-center content-center">
          <p className="font-bold text-2xl">${product.price}</p>
          <AddToCartButton id={product.id} name={product.name} />
        </div>
      </footer>
    </header>
  );
}
