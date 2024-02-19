import { cookies } from "next/headers";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { carts, products } from "../db/schema";
import { CartLineItem } from "../types";

export async function getCart(input?: {
  cartId: number;
}): Promise<CartLineItem[]> {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId || isNaN(Number(cartId))) return [];

  const cart = await db.query.carts.findFirst({
    columns: {
      items: true,
    },
    where: eq(carts.id, Number(cartId)),
  });

  const productIds = cart?.items?.map((item) => item.productId) ?? [];

  if (productIds.length === 0) return [];

  const cartLineItems = await db
    .select({
      id: products.id,
      name: products.name,
      images: products.images,
      category: products.category,
      price: products.price,
    })
    .from(products)
    .then((items) => {
      return items.map((item) => {
        const quantity = cart?.items?.find(
          (cartItem) => cartItem.productId === item.id
        )?.quantity;

        return {
          ...item,
          quantity: quantity ?? 0,
        };
      });
    });

  return cartLineItems;
}

export async function getCartItems(input: { cartId?: number }) {
  if (!input.cartId || isNaN(input.cartId)) return [];

  try {
    const cart = await db.query.carts.findFirst({
      where: eq(carts.id, input.cartId),
    });

    return cart?.items;
  } catch (err) {
    console.error(err);
    return [];
  }
}
