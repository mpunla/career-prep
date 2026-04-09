import { UserTable } from "@/drizzle/schema";
import { InterviewTable } from "@/drizzle/schema/interviews";
import { QuestionTable } from "@/drizzle/schema/questions";
import { createdAt, id, updatedAt } from "@/drizzle/schemaHelpers";
import { relations } from "drizzle-orm";
import { pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";

export const experienceLevels = ["junior", "mid-level", "senior"] as const;
export type ExperienceLevel = (typeof experienceLevels)[number];
export const experienceLevelEnum = pgEnum(
  "job_infos_experience_level",
  experienceLevels,
);

export const JobInfoTable = pgTable("job_infos", {
  createdAt,
  description: varchar().notNull(),
  experienceLevel: experienceLevelEnum().notNull(),
  id,
  name: varchar().notNull(),
  title: varchar(),
  updatedAt,
  userId: varchar()
    .references(() => UserTable.id, { onDelete: "cascade" })
    .notNull(),
});

export const jobInfoRelations = relations(JobInfoTable, ({ one, many }) => ({
  interviews: many(InterviewTable),
  questions: many(QuestionTable),
  user: one(UserTable, {
    fields: [JobInfoTable.userId],
    references: [UserTable.id],
  }),
}));
