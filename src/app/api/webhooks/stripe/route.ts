import { db } from "@/lib/db";
import { addresses, carts, orders, payments } from "@/lib/db/schema";
import { stripe } from "@/lib/stripe";
import { CheckoutItem, checkoutItemSchema } from "@/lib/types";
import { clerkClient } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import type Stripe from "stripe";
import { z } from "zod";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown error."}`,
      { status: 400 }
    );
  }

  switch (event.type) {
    // Handling payment events
    case "payment_intent.payment_failed":
      const paymentIntentPaymentFailed = event.data.object;
      console.log(
        `❌ Payment failed: ${paymentIntentPaymentFailed.last_payment_error?.message}`
      );
      break;
    case "payment_intent.processing":
      const paymentIntentProcessing = event.data.object;
      console.log(`⏳ Payment processing: ${paymentIntentProcessing.id}`);
      break;
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;

      const paymentIntentId = paymentIntentSucceeded?.id;
      const orderAmount = paymentIntentSucceeded?.amount;
      const checkoutItems = paymentIntentSucceeded?.metadata
        ?.items as unknown as CheckoutItem[];

      // If there are items in metadata, then create order
      if (checkoutItems) {
        try {
          if (!event.account) throw new Error("No account found.");

          // Parsing items from metadata
          // Didn't parse before because can pass the unparsed data directly to the order table items json column in the db
          const safeParsedItems = z
            .array(checkoutItemSchema)
            .safeParse(
              JSON.parse(paymentIntentSucceeded?.metadata?.items ?? "[]")
            );

          if (!safeParsedItems.success) {
            throw new Error("Could not parse items.");
          }

          const payment = await db.query.payments.findFirst({
            columns: {
              id: true,
            },
            where: eq(payments.stripeAccountId, event.account),
          });

          if (!payment?.id) {
            return new Response("Store not found.", { status: 404 });
          }

          // Create new address in DB
          const stripeAddress = paymentIntentSucceeded?.shipping?.address;

          const newAddress = await db.insert(addresses).values({
            line1: stripeAddress?.line1,
            line2: stripeAddress?.line2,
            city: stripeAddress?.city,
            state: stripeAddress?.state,
            country: stripeAddress?.country,
            postalCode: stripeAddress?.postal_code,
          });

          if (!newAddress.insertId) throw new Error("No address created.");

          // Create new order in db
          await db.insert(orders).values({
            id: payment.id,
            items: checkoutItems ?? [],
            quantity: safeParsedItems.data.reduce(
              (acc: any, item: { quantity: any }) => acc + item.quantity,
              0
            ),
            amount: String(Number(orderAmount) / 100),
            stripePaymentIntentId: paymentIntentId,
            stripePaymentIntentStatus: paymentIntentSucceeded?.status,
            name: paymentIntentSucceeded?.shipping?.name,
            email: paymentIntentSucceeded?.receipt_email,
            addressId: Number(newAddress.insertId),
          });

          // Close cart and clear items
          await db
            .update(carts)
            .set({
              closed: true,
              items: [],
            })
            .where(eq(carts.paymentIntentId, paymentIntentId));
        } catch (err) {
          console.log("Error creating order.", err);
        }
      }
      break;
    case "application_fee.created":
      const applicationFeeCreated = event.data.object;
      console.log(`Application fee id: ${applicationFeeCreated.id}`);
      break;
    case "charge.succeeded":
      const chargeSucceeded = event.data.object;
      console.log(`Charge id: ${chargeSucceeded.id}`);
      break;
    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  return new Response(null, { status: 200 });
}
