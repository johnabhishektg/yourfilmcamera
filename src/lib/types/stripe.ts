import { z } from "zod";
import { cartLineItemSchema } from ".";

export const getStripeAccountSchema = z.object({
  cartId: z.number(),
  retrieveAccount: z.boolean().default(true).optional(),
});

export const createPaymentIntentSchema = z.object({
  cartId: z.number(),
  items: z.array(cartLineItemSchema),
});

export const getPaymentIntentsSchema = z.object({
  cartId: z.number(),
  limit: z.number().optional(),
  starting_after: z.string().optional(),
  ending_before: z.string().optional(),
  customer: z.string().optional(),
  expand: z.array(z.string()).optional(),
  created: z.number().optional(),
});

export const getPaymentIntentSchema = z.object({
  cartId: z.number(),
  paymentIntentId: z.string(),
  deliveryPostalCode: z.string().optional().nullable(),
});

export const manageSubscriptionSchema = z.object({
  stripePriceId: z.string(),
  stripeCustomerId: z.string().optional().nullable(),
  stripeSubscriptionId: z.string().optional().nullable(),
  isSubscribed: z.boolean(),
  isCurrentPlan: z.boolean(),
});
