"use server";

import { getCurrentUser } from "@/app/services/clerk/lib/getCurrentUser";
import { db } from "@/drizzle/db";
import { InterviewTable } from "@/drizzle/schema/interviews";
import { insertInterview, updateInterview as updateInterviewDb } from "@/features/interviews/db";
import {
  getInterviewIdTag,
  getInterviewJobInfoTag,
} from "@/features/interviews/dbCache";
import { getJobInfo } from "@/features/jobInfos/actions";
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache";
import { and, desc, eq, isNotNull } from "drizzle-orm";
import { cacheTag } from "next/cache";

export async function createInterview(jobInfoId: string) {
  const { userId } = await getCurrentUser();
  if (!userId) {
    return { error: true, message: "Unauthorized" };
  }

  const jobInfo = await getJobInfo(jobInfoId);
  if (!jobInfo) {
    return { error: true, message: "Job info not found" };
  }

  const interview = await insertInterview({ jobInfoId, duration: "00:00:00" });

  return { error: false, id: interview.id };
}

export async function updateInterview(
  id: string,
  data: { duration?: string; humeChatId?: string },
) {
  const { userId } = await getCurrentUser();
  if (!userId) {
    return { error: true, message: "Unauthorized" };
  }

  const interview = await getInterview(id, userId);
  if (!interview) {
    return { error: true, message: "Interview not found" };
  }

  await updateInterviewDb(id, data);
  return { error: false };
}

async function getInterview(id: string, userId: string) {
  "use cache";
  cacheTag(getInterviewIdTag(id));

  const interview = await db.query.InterviewTable.findFirst({
    where: eq(InterviewTable.id, id),
    with: {
      jobInfo: {
        columns: {
          id: true,
          userId: true,
          description: true,
          title: true,
          experienceLevel: true,
        },
      },
    },
  });

  if (!interview) return null;

  cacheTag(getJobInfoIdTag(interview.jobInfo.id));
  if (interview.jobInfo.userId !== userId) return null;

  return interview;
}

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
