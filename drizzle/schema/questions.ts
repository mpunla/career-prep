import { JobInfoTable } from "@/drizzle/schema/jobInfo";
import { createdAt, id, updatedAt } from "@/drizzle/schemaHelpers";
import { relations } from "drizzle-orm";
import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const questionDifficulties = ["easy", "medium", "hard"] as const;
export type QuestionDifficulty = (typeof questionDifficulties)[number];
export const questionDifficultyEnum = pgEnum(
  "questions_question_difficulty",
  questionDifficulties,
);

export const QuestionTable = pgTable("questions", {
  createdAt,
  difficulty: questionDifficultyEnum().notNull(),
  id,
  jobInfoId: uuid()
    .references(() => JobInfoTable.id, { onDelete: "cascade" })
    .notNull(),
  text: varchar().notNull(),
  updatedAt,
});

export const questionRelations = relations(QuestionTable, ({ one }) => ({
  jobInfo: one(JobInfoTable, {
    fields: [QuestionTable.jobInfoId],
    references: [JobInfoTable.id],
  }),
}));
