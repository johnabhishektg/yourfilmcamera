"use server";

import { products } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { catchError } from "@/lib/utils";

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

export async function getProductFromId(input: { productId?: number }) {
  if (!input.productId || isNaN(input.productId)) return [];

  try {
    const prodId = await db
      .select({
        id: products.id,
        category: products?.category || "cameras",
        images: products.images,
        name: products.name,
        new: products.new,
        description: products.description,
        price: products.price,
      })
      .from(products)
      .where(eq(products.id, input.productId));

    return prodId;
  } catch (err) {
    console.error(err);
    return [];
  }
}
