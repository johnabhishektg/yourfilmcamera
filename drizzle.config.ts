import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  driver: "mysql2",
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle/migrations",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
