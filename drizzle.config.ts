
import { env } from "~/env";

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql", 
  schema: "./src/schema/*",
  out: "./drizzle",
  dbCredentials: {
    url: env.POSTGRES_URL,
  }
});