"use server";

import { db } from "@/lib/db";
import { carts, products } from "@/lib/db/schema";
import { cartItemSchema } from "@/lib/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

export async function addToCart(rawInput: z.infer<typeof cartItemSchema>) {
  const input = cartItemSchema.parse(rawInput);

  // Checking if product is in stock
  const product = await db.query.products.findFirst({
    where: eq(products.id, input.productId),
  });

  if (!product) {
    throw new Error("Product not found, please try again.");
  }

  if (input.quantity < 0) {
    throw new Error("Product is out of stock, please try again later.");
  }

  const cookieStore = cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) {
    const cart = await db.insert(carts).values({
      items: [input],
    });

    // Note: .set() is only available in a Server Action or Route Handler
    cookieStore.set("cartId", String(cart.insertId));

    revalidatePath("/");
    return;
  }
  const cart = await db.query.carts.findFirst({
    where: eq(carts.id, Number(cartId)),
  });

  // TODO: Find a better way to deal with expired carts
  if (!cart) {
    cookieStore.set({
      name: "cartId",
      value: "",
      expires: new Date(0),
    });

    await db.delete(carts).where(eq(carts.id, Number(cartId)));

    throw new Error("Cart not found, please try again.");
  }

  // If cart is closed, delete it and create a new one
  if (cart.closed) {
    await db.delete(carts).where(eq(carts.id, Number(cartId)));

    const newCart = await db.insert(carts).values({
      items: [input],
    });

    cookieStore.set("cartId", String(newCart.insertId));

    revalidatePath("/");
    return;
  }

  const cartItem = cart.items?.find(
    (item) => item.productId === input.productId
  );

  if (cartItem) {
    cartItem.quantity += input.quantity;
  } else {
    cart.items?.push(input);
  }

  await db
    .update(carts)
    .set({
      items: cart.items,
    })
    .where(eq(carts.id, Number(cartId)));

  revalidatePath("/");
}

export async function getQuantityOfCart() {
  const cookieStore = cookies();
  const cartId = cookieStore.get("cartId")?.value;

  const quantity = await db
    .select({ items: carts.items })
    .from(carts)
    .where(eq(carts.id, Number(cartId)));

  return quantity;
}
