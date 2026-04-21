"use server";
import { db } from "@/drizzle/db";
import { QuestionTable } from "@/drizzle/schema";
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache";
import {
  getQuestionIdTag,
  getQuestionJobInfoTag,
} from "@/features/questions/dbCache";
import { asc, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";

export async function getQuestion(id: string, userId: string) {
  "use cache";
  cacheTag(getQuestionIdTag(id));

  const question = await db.query.QuestionTable.findFirst({
    where: eq(QuestionTable.id, id),
    with: { jobInfo: { columns: { id: true, userId: true } } },
  });

  if (!question) return null;
  cacheTag(getJobInfoIdTag(question.jobInfo.id));

  if (question.jobInfo.userId !== userId) return null;
  return question;
}

export async function getQuestions(jobInfoId: string) {
  "use cache";
  cacheTag(getQuestionJobInfoTag(jobInfoId));

  return db.query.QuestionTable.findMany({
    orderBy: asc(QuestionTable.createdAt),
    where: eq(QuestionTable.jobInfoId, jobInfoId),
  });
}
