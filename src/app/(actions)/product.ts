"use server";

import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { createProductSchema, productSchema } from "@/lib/types";
import { and, eq, not } from "drizzle-orm";
import { z } from "zod";

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

export async function checkProduct(input: { name: string; id?: number }) {
  try {
    const productWithSameName = await db.query.products.findFirst({
      columns: {
        id: true,
      },
      where: input.id
        ? and(not(eq(products.id, input.id)), eq(products.name, input.name))
        : eq(products.name, input.name),
    });

    if (productWithSameName) {
      throw new Error("Product name already taken.");
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function addProduct(
  rawInput: z.infer<typeof createProductSchema>
) {
  const input = createProductSchema.parse(rawInput);

  const productWithSameName = await db.query.products.findFirst({
    columns: {
      id: true,
    },
    where: eq(products.name, input.name),
  });

  if (productWithSameName) {
    throw new Error("Product name already taken.");
  }

  // await db.insert(products).values(input);
}
