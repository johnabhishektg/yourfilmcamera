"use server";

import { products } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function getAllProducts() {
  const prod = await db.select().from(products);

  return prod;
}

export async function getProductFromId(input: { productId?: number }) {
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  if (!input.productId || isNaN(input.productId)) return [];

  try {
    const prodId = await db
      .select()
      .from(products)
      .where(eq(products.id, input.productId));

    return prodId;
  } catch (err) {
    console.error(err);
    return [];
  }
}
