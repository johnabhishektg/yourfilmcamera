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
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // for (let i = 0; i < product.length; i++) {
  //   allProducts.push({
  //     id: product[i].id,
  //     images: null,
  //     name: product[i].name,
  //     new: product[i].new,
  //     description: product[i].description,
  //     price: product[i].price.toString(),
  //     createdAt: null,
  //   });
  // }
  // await db.insert(products).values(allProducts);
  // await db.select().from(users).where(eq(users.id, 1));

  const prod = await db
    .select({
      id: products.id,
      category: products?.category || "cameras",
      images: products.images,
      name: products.name,
      new: products.new,
      description: products.description,
      price: products.price,
      createdAt: products.createdAt,
    })
    .from(products);

  // const prod = await db.select().from(products);
  return prod;
  // console.log(prod);
}
