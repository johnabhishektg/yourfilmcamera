import { stripe } from "@/lib/stripe";
import { products } from "../db/schema";
import { getCart, getCartItems } from "./cart";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getUserEmail } from "../utils";
import { currentUser } from "@clerk/nextjs";

const getActiveProducts = async () => {
  const checkProducts = await stripe.products.list();
  const availableProducts = checkProducts.data.filter(
    (product: any) => product.active === true
  );
  return availableProducts;
};

export async function createProduct() {
  const cartLineItems = await getCart();

  let activeProducts = await getActiveProducts();

  try {
    for (const product of cartLineItems) {
      const stripeProduct = activeProducts?.find(
        (stripeProduct: any) =>
          stripeProduct?.name?.toLowerCase() == product?.name?.toLowerCase()
      );
      if (stripeProduct == undefined) {
        await stripe.products.create({
          name: product.name,
          default_price_data: {
            unit_amount: Number(product.price) * 100,
            currency: "INR",
          },
        });
      }
    }
  } catch (error) {
    console.error("Error in creating a new product", error);
    throw error;
  }
}

export const stripeProductCheckout = async () => {
  await createProduct();

  const user = await currentUser();

  const email = getUserEmail(user);

  const cartLineItems = await getCart();
  let activeProducts = await getActiveProducts();
  let stripeItems: any = [];

  for (const product of cartLineItems) {
    const stripeProduct = activeProducts?.find(
      (prod: any) => prod?.name?.toLowerCase() == product?.name?.toLowerCase()
    );

    if (stripeProduct) {
      stripeItems.push({
        price: stripeProduct?.default_price,
        quantity: product?.quantity,
      });
    }
  }

  const filterStripeItems = stripeItems.filter(
    (stripeItem: any) => stripeItem.quantity !== 0
  );

  const session = await stripe.checkout.sessions.create({
    line_items: filterStripeItems,
    customer_email: email,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
  });

  return { url: session.url };
};
