import db from "./connection.js";
import { users } from "./drizzle_essentials/schema.js";

const testConnection = async () => {
  const userInfo = await db.select().from(users);
  userInfo
    ? console.log("Connected to Database!")
    : console.error("Failed to connect to Database!");
};

export default testConnection;