"use server";

import { products, type Product, users } from "@/lib/db/schema";
import productjson from "../../../products.json";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function generateProducts() {
  const allProducts: Product[] = [];

  // for (let i = 0; i < product.length; i++) {
  //   allProducts.push({
  //     id: product[i].id,
  //     category: "cameras",
  //     images: null,
  //     name: product[i].name,
  //     new: product[i].new,
  //     description: product[i].description,
  //     price: product[i].price.toString(),
  //     createdAt: null,
  //   });
  // }
  // await db.insert(products).values(allProducts);
  // const prod = await db.select().from(users).where(eq(users.id, 1));
  const prod = await db.select().from(products);
  console.log(prod);
}
