import { eq } from "drizzle-orm";
import { stripe } from "@/lib/stripe";
import { z } from "zod";
import { db } from "../db";
import { carts, payments } from "../db/schema";
import {
  getPaymentIntentsSchema,
  getPaymentIntentSchema,
  getStripeAccountSchema,
} from "../types/stripe";
import { cookies } from "next/headers";

// Getting the Stripe account for a cart
export async function getStripeAccount(
  rawInput: z.infer<typeof getStripeAccountSchema>
) {
  const falsyReturn = {
    isConnected: false,
    payment: null,
    account: null,
  };

  try {
    const input = getStripeAccountSchema.parse(rawInput);

    const retrieveAccount = input.retrieveAccount ?? true;

    const cart = await db.query.carts.findFirst({
      columns: {
        stripeAccountId: true,
      },
      where: eq(carts.id, input.cartId),
    });

    if (!cart) return falsyReturn;

    const payment = await db.query.payments.findFirst({
      columns: {
        stripeAccountId: true,
        detailsSubmitted: true,
      },
      where: eq(payments.id, input.cartId),
    });

    if (!payment || !payment.stripeAccountId) return falsyReturn;

    if (retrieveAccount)
      return {
        isConnected: true,
        account: null,
        payment,
      };

    const account = await stripe.accounts.retrieve(payment.stripeAccountId);

    if (!account) return falsyReturn;

    // If the account details have been submitted, we update the cart and payment records
    if (account.details_submitted && !payment.detailsSubmitted) {
      await db.transaction(async (tx) => {
        await tx
          .update(payments)
          .set({
            detailsSubmitted: account.details_submitted,
            stripeAccountCreatedAt: account.created,
          })
          .where(eq(payments.id, input.cartId));

        await tx
          .update(carts)
          .set({
            stripeAccountId: account.id,
          })
          .where(eq(carts.id, input.cartId));
      });
    }

    return {
      isConnected: payment.detailsSubmitted,
      account: account.details_submitted ? account : null,
      payment,
    };
  } catch (err) {
    err instanceof Error && console.error(err.message);
    return falsyReturn;
  }
}

// Modified from: https://github.com/jackblatch/OneStopShop/blob/main/server-actions/stripe/payment.ts
// Getting payment intents for a store
export async function getPaymentIntents(
  rawInput: z.infer<typeof getPaymentIntentsSchema>
) {
  try {
    const input = getPaymentIntentsSchema.parse(rawInput);

    const { isConnected, payment } = await getStripeAccount({
      cartId: input.cartId,
      retrieveAccount: false,
    });

    if (!isConnected || !payment) {
      throw new Error("Store not connected to Stripe.");
    }

    if (!payment.stripeAccountId) {
      throw new Error("Stripe account not found.");
    }

    const paymentIntents = await stripe.paymentIntents.list(
      {
        limit: input.limit ?? 10,
      },
      {
        stripeAccount: payment.stripeAccountId,
      }
    );

    return {
      paymentIntents: paymentIntents.data.map((item) => ({
        id: item.id,
        amount: item.amount,
        created: item.created,
        cartId: Number(item.metadata.cartId),
      })),
      hasMore: paymentIntents.has_more,
    };
  } catch (err) {
    console.error(err);
    return {
      paymentIntents: [],
      hasMore: false,
    };
  }
}

// Modified from: https://github.com/jackblatch/OneStopShop/blob/main/server-actions/stripe/payment.ts
// Getting a payment intent for a store
export async function getPaymentIntent(
  rawInput: z.infer<typeof getPaymentIntentSchema>
) {
  try {
    const input = getPaymentIntentSchema.parse(rawInput);

    const cartId = cookies().get("cartId")?.value;

    const { isConnected, payment } = await getStripeAccount({
      cartId: input.cartId,
      retrieveAccount: false,
    });

    if (!isConnected || !payment) {
      throw new Error("Store not connected to Stripe.");
    }

    if (!payment.stripeAccountId) {
      throw new Error("Stripe account not found.");
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(
      input.paymentIntentId,
      {
        stripeAccount: payment.stripeAccountId,
      }
    );

    console.log(paymentIntent);

    if (paymentIntent.status !== "succeeded") {
      throw new Error("Payment intent not succeeded.");
    }

    if (
      paymentIntent.metadata.cartId !== cartId &&
      paymentIntent.shipping?.address?.postal_code?.split(" ").join("") !==
        input.deliveryPostalCode
    ) {
      throw new Error("CartId or delivery postal code does not match.");
    }

    return {
      paymentIntent,
      isVerified: true,
    };
  } catch (err) {
    console.error(err);
    return {
      paymentIntent: null,
      isVerified: false,
    };
  }
}
