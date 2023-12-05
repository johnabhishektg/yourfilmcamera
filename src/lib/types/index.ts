import { z } from "zod";
import { products } from "../db/schema";

export interface StoredFile {
  id: string;
  name: string;
  url: string;
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
  images: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        url: z.string(),
      })
    )
    .optional()
    .nullable(),
  category: z.enum(products.category.enumValues),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/),
  quantity: z.number(),
});

export type CartItem = z.infer<typeof cartItemSchema>;
