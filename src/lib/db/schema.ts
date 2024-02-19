import { InferModel } from "drizzle-orm";
import {
  boolean,
  decimal,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { CartItem, CheckoutItem } from "../types";
import { createId } from "../utils";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  name: text("full_name"),
});

export type User = InferModel<typeof users, "select">;

export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  new: boolean("boolean"),
  images: json("images").$type<null>().default(null),
  category: mysqlEnum("category", ["cameras", "lens", "film rolls"])
    .notNull()
    .default("cameras"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
});

export type Product = InferModel<typeof products>;

export const carts = mysqlTable("carts", {
  id: serial("id").primaryKey(),
  stripeAccountId: varchar("stripe_account_id", { length: 191 }),
  paymentIntentId: varchar("paymentIntentId", { length: 191 }),
  clientSecret: varchar("clientSecret", { length: 191 }),
  items: json("items").$type<CartItem[] | null>().default(null),
  closed: boolean("closed").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export type Cart = InferModel<typeof carts>;
export type NewCart = InferModel<typeof carts>;

export const emailPreferences = mysqlTable("email_preferences", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 191 }),
  email: varchar("email", { length: 191 }).notNull(),
  token: varchar("token", { length: 191 }).notNull(),
  newsletter: boolean("newsletter").notNull().default(false),
  marketing: boolean("marketing").notNull().default(false),
  transactional: boolean("transactional").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});

export type EmailPreference = InferModel<typeof emailPreferences>;
export type NewEmailPreference = InferModel<typeof emailPreferences>;

export const subscriptions = mysqlTable("subscriptions", {
  id: varchar("id", { length: 128 }).default(createId()).primaryKey(),
  userId: varchar("user_id", { length: 191 }).unique().notNull(),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 191 }),
  stripePriceId: varchar("stripe_price_id", { length: 191 }),
  stripeCustomerId: varchar("stripe_customer_id", { length: 191 }),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});

export type Subscription = InferModel<typeof subscriptions>;
export type NewSubscription = InferModel<typeof subscriptions>;

// Original source: https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
export const payments = mysqlTable("payments", {
  id: serial("id").primaryKey(),
  stripeAccountId: varchar("stripe_account_id", { length: 191 }).notNull(),
  stripeAccountCreatedAt: int("stripe_account_created_at"),
  stripeAccountExpiresAt: int("stripe_account_expires_at"),
  detailsSubmitted: boolean("details_submitted").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});

export type Payment = InferModel<typeof payments>;
export type NewPayment = InferModel<typeof payments>;

// Original source: https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
export const orders = mysqlTable("orders", {
  id: serial("id").primaryKey(),
  items: json("items").$type<CheckoutItem[] | null>().default(null),
  quantity: int("quantity"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull().default("0"),
  stripePaymentIntentId: varchar("stripe_payment_intent_id", {
    length: 191,
  }).notNull(),
  stripePaymentIntentStatus: varchar("stripe_payment_intent_status", {
    length: 191,
  }).notNull(),
  name: varchar("name", { length: 191 }),
  email: varchar("email", { length: 191 }),
  addressId: int("address_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});

export type Order = InferModel<typeof orders>;
export type NewOrder = InferModel<typeof orders>;

// Original source: https://github.com/jackblatch/OneStopShop/blob/main/db/schema.ts
export const addresses = mysqlTable("addresses", {
  id: serial("id").primaryKey(),
  line1: varchar("line1", { length: 191 }),
  line2: varchar("line2", { length: 191 }),
  city: varchar("city", { length: 191 }),
  state: varchar("state", { length: 191 }),
  postalCode: varchar("postal_code", { length: 191 }),
  country: varchar("country", { length: 191 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});

export type Address = InferModel<typeof addresses>;
export type NewAddress = InferModel<typeof addresses>;
