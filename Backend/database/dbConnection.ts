import path from "path"
import { config } from "dotenv";
config({ path: path.resolve(process.cwd(), ".env") });
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const dbConnectionString: string | undefined = process.env.DATABASE_URL;

if (!dbConnectionString)
  throw new Error("Environment Variable DB Connection String Missing!");

const client = postgres(dbConnectionString, { max: 5 });

export const dbConnection = drizzle(client);
