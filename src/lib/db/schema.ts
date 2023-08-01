import { InferModel } from "drizzle-orm";
import {
  boolean,
  decimal,
  json,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

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
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Product = InferModel<typeof products>;
