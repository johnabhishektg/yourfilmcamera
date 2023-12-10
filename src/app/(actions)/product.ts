"use server";

import { products } from "@/lib/db/schema";
import { db } from "@/lib/db";

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

export async function getAllProducts() {
  // await new Promise((resolve) => setTimeout(resolve, 10000));

  const prod = await db
    .select({
      id: products.id,
      category: products?.category || "cameras",
      images: products.images,
      name: products.name,
      new: products.new,
      description: products.description,
      price: products.price,
    })
    .from(products);

  // const prod = await db.select().from(products);
  return prod;
}
