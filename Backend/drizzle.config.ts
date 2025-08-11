import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config({ path: "./.env", quiet: true });

export default defineConfig({
  schema: "./drizzle_essentials/schema.ts", // Schema File Location
  out: "./drizzle_essentials/drizzle", // Generated SQL Directory
  dialect: "mysql",
  verbose: true,
  strict: true,
  dbCredentials: {
    host: process.env.DB_HOSTNAME!,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
  },
});
