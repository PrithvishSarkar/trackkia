import path from "path"
import { config } from "dotenv";
config({ path: path.resolve(process.cwd(), ".env") });
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const dbConnectionString: string | undefined = process.env.DB_TRANSACTION_POOLER_URL;

if (!dbConnectionString)
  throw new Error("Environment Variable DB Connection String Missing!");

const client = postgres(dbConnectionString, { prepare: false });

export const dbConnection = drizzle(client);
