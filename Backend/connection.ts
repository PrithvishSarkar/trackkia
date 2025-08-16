// MySQL connection.
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: "./.env", quiet: true });

if (!process.env.DB_PASSWORD) {
  console.error("Cannot find environment variable.");
  process.exit(1);
}

// Creating a Connection Pool from Connection String.
const pool: mysql.Pool = mysql.createPool({
  host: process.env.DB_HOSTNAME,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // number of connections in pool.
  queueLimit: 0,
});

// Exporting drizzle connection.
export default drizzle(pool);
