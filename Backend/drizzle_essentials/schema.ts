import { sql } from "drizzle-orm";
import {
  date,
  datetime,
  int,
  mysqlEnum,
  mysqlTable,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "users",
  {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 50 }).notNull(),
    email: varchar("email", { length: 100 }).unique().notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    createdAt: datetime("createdAt")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [uniqueIndex("email_idx").on(table.email)]
);

export const tasks = mysqlTable("tasks", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 50 }).notNull(),
  description: varchar("description", { length: 100 }).notNull(),
  priority: mysqlEnum("priority", [
    "Low Priority",
    "Medium Priority",
    "High Priority",
  ]).notNull(),
  status: mysqlEnum("status", ["Pending", "In Progress", "Completed"])
    .notNull()
    .default("Pending"),
  userId: int("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  startingDate: date("startingDate").notNull(), // Frontend will provide the data for 'date'.
  deadline: date("deadline").notNull(), // Frontend will provide the data for 'date'.
});
