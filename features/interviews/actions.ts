"use server";

import { db } from "@/drizzle/db";
import { InterviewTable } from "@/drizzle/schema/interviews";
import { getInterviewJobInfoTag } from "@/features/interviews/dbCache";
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache";
import { and, desc, eq, isNotNull } from "drizzle-orm";
import { cacheTag } from "next/cache";

export async function getInterviews(jobInfoId: string, userId: string) {
  "use cache";
  cacheTag(getInterviewJobInfoTag(jobInfoId));
  cacheTag(getJobInfoIdTag(jobInfoId));

  const data = await db.query.InterviewTable.findMany({
    orderBy: desc(InterviewTable.updatedAt),
    where: and(
      eq(InterviewTable.jobInfoId, jobInfoId),
      isNotNull(InterviewTable.humeChatId),
    ),
    with: { jobInfo: { columns: { userId: true } } },
  });

  return data.filter((interview) => interview.jobInfo.userId === userId);
}
