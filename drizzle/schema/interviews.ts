import { JobInfoTable } from "@/drizzle/schema/jobInfo";
import { createdAt, id, updatedAt } from "@/drizzle/schemaHelpers";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";

export const InterviewTable = pgTable("interviews", {
  createdAt,
  duration: varchar().notNull(),
  feedback: varchar(),
  humeChatId: varchar(),
  id,
  jobInfoId: uuid()
    .references(() => JobInfoTable.id, { onDelete: "cascade" })
    .notNull(),
  updatedAt,
});

export const interviewRelations = relations(InterviewTable, ({ one }) => ({
  jobInfo: one(JobInfoTable, {
    fields: [InterviewTable.jobInfoId],
    references: [JobInfoTable.id],
  }),
}));
