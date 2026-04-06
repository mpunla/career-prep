import { JobInfoTable } from "@/drizzle/schema/jobInfo";
import { createdAt, updatedAt } from "@/drizzle/schemaHelpers";
import { relations } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";

export const UserTable = pgTable("users", {
  createdAt,
  email: varchar().notNull().unique(),
  id: varchar().primaryKey(),
  imageUrl: varchar().notNull(),
  name: varchar().notNull(),
  updatedAt,
});

export const userRelations = relations(UserTable, ({ many }) => ({
  jobInfo: many(JobInfoTable),
}));
