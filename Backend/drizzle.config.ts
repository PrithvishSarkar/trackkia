import path from "path";
import { config } from "dotenv";
config({ path: path.resolve(process.cwd(), ".env") });

import { defineConfig } from "drizzle-kit";

const dbConnectionString: string | undefined = process.env.DB_SESSION_POOLER_URL;
if (!dbConnectionString)
  throw new Error("Environment Variable DB Connection String Missing!");

export default defineConfig({
  out: "./database/drizzle",
  schema: "./database/schema.ts",
  dialect: "postgresql",
  verbose: true,
  strict: true,
  dbCredentials: {
    url: dbConnectionString,
  },
});
