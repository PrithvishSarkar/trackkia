import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// Define PostgreSQL Enums
export const priorityEnum = pgEnum("priority", [
  "Low Priority",
  "Medium Priority",
  "High Priority",
]);

export const statusEnum = pgEnum("status", [
  "Pending",
  "In Progress",
  "Completed",
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const tasks = pgTable(
  "tasks",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 50 }).notNull(),
    description: varchar("description", { length: 100 }).notNull(),
    priority: priorityEnum("priority").notNull(),
    status: statusEnum("status").notNull().default("Pending"),
    userId: integer("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    // Frontend will provide the data for 'date'.
    startingDate: timestamp("startingDate", { mode: "date" }).notNull(),
    deadline: timestamp("deadline", { mode: "date" }).notNull(),
  },
  (table) => [index("user_id_idx").on(table.userId)],
);

export const otps = pgTable("otps", {
  id: serial("id").primaryKey(),
  otp: varchar("otp", { length: 255 }).notNull(),
  otpExpiry: timestamp("otpExpiry", { mode: "date" }).notNull(),
  userId: integer("userId")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
