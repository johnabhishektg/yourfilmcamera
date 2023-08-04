"use server";

import { products, type Product, users } from "@/lib/db/schema";
import productjson from "../../../products.json";
import { db } from "@/lib/db";

export async function generateProducts() {
  const allProducts: Product[] = [];

  const product = productjson.products;
  console.log(allProducts);

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
  // await db.select().from(users).where(eq(users.id, 1));
  await db.query.users.findMany();
}
