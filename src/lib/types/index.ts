import { z } from "zod";
import { products } from "../db/schema";

export interface StoredFile {
  id: string;
  name: string;
  url: string;
}

export interface Product {
  id: number;
  productId: number;
  category: string;
  images: string;
  image: string;
  name: string;
  new: boolean;
  description: string;
  price: number;
  quantity?: number;
}

// CART

export const cartItemSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(0),
  category: z.string().optional().nullable(),
});

export const cartLineItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  images: z.string().optional().nullable(),
  category: z.enum(products.category.enumValues),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/),
  quantity: z.number(),
});

export type CartItem = z.infer<typeof cartItemSchema>;
export type CartLineItem = z.infer<typeof cartLineItemSchema>;

export const deleteCartItemSchema = z.object({
  productId: z.number(),
});

export const deleteCartItemsSchema = z.object({
  productIds: z.array(z.number()),
});

export const getProductsSchema = z.object({
  categories: z.string().optional().nullable(),
  sort: z.string().optional().nullable(),
  active: z.string().optional().nullable(),
});

export const filterProductsSchema = z.object({
  query: z.string(),
});

export const checkoutItemSchema = cartItemSchema.extend({
  price: z.number(),
});

export type CheckoutItem = z.infer<typeof checkoutItemSchema>;

export const createProductSchema = z.object({
  name: z.string().min(1, {
    message: "Must be at least 1 character",
  }),
  description: z.string().optional(),
  category: z.string(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Must be a valid price",
  }),
  images: z.string(),
});

export const productSchema = z.object({
  name: z.string().min(1, {
    message: "Must be at least 1 character",
  }),
  description: z.string().optional(),
  category: z
    .enum(products.category.enumValues, {
      required_error: "Must be a valid category",
    })
    .default(products.category.enumValues[0]),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Must be a valid price",
  }),
  images: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false;
      if (val.some((file) => !(file instanceof File))) return false;
      return true;
    }, "Must be an array of File")
    .optional()
    .nullable()
    .default(null),
});

// Original source: https://github.com/jackblatch/OneStopShop/blob/main/server-actions/stripe/payment.ts
export function calculateOrderAmount(items: CartLineItem[]) {
  const total = items.reduce((acc, item) => {
    return acc + Number(item.price) * item.quantity;
  }, 0);
  const fee = total * 0.01;
  return {
    total: Number((total * 100).toFixed(0)), // converts to cents which stripe charges in
    fee: Number((fee * 100).toFixed(0)),
  };
}
