"use server";

import { generateAiInterviewFeedback } from "@/app/services/ai/interviews/interviews";
import { getCurrentUser } from "@/app/services/clerk/lib/getCurrentUser";
import { env } from "@/data/env/server";
import { db } from "@/drizzle/db";
import { InterviewTable } from "@/drizzle/schema/interviews";
import {
  insertInterview,
  updateInterview as updateInterviewDb,
} from "@/features/interviews/db";
import {
  getInterviewIdTag,
  getInterviewJobInfoTag,
} from "@/features/interviews/dbCache";
import { getJobInfo } from "@/features/jobInfos/actions";
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache";
import { RATE_LIMIT_MESSAGE } from "@/lib/errorToast";
import arcjet, { request, tokenBucket } from "@arcjet/next";
import { and, desc, eq, isNotNull } from "drizzle-orm";
import { cacheTag } from "next/cache";

const aj = arcjet({
  characteristics: ["userId"],
  key: env.ARCJET_KEY,
  rules: [
    tokenBucket({
      capacity: 12,
      interval: "1d",
      mode: "LIVE",
      refillRate: 4,
    }),
  ],
});

export async function createInterview(jobInfoId: string) {
  const { userId } = await getCurrentUser();
  if (!userId) {
    return { error: true, message: "Unauthorized" };
  }

  const decision = await aj.protect(await request(), {
    requested: 1,
    userId,
  });
  if (decision.isDenied()) {
    return {
      error: true,
      message: RATE_LIMIT_MESSAGE,
    };
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
  data: { duration?: string; feedback?: string; humeChatId?: string },
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

export async function generateInterviewFeedback(interviewId: string) {
  const { userId, user } = await getCurrentUser({ allData: true });
  if (!userId || !user) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  const interview = await getInterview(interviewId, userId);
  if (!interview) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  if (!interview.humeChatId) {
    return {
      error: true,
      message: "Interview not completed",
    };
  }

  const feedback = await generateAiInterviewFeedback({
    humeChatId: interview.humeChatId,
    jobInfo: interview.jobInfo,
    userName: user.name,
  });
  if (!feedback) {
    return {
      error: true,
      message: "Failed to generate feedback",
    };
  }

  await updateInterviewDb(interviewId, { feedback });

  return { error: false };
}

export async function getInterview(id: string, userId: string) {
  "use cache";
  cacheTag(getInterviewIdTag(id));

  const interview = await db.query.InterviewTable.findFirst({
    where: eq(InterviewTable.id, id),
    with: {
      jobInfo: {
        columns: {
          description: true,
          experienceLevel: true,
          id: true,
          title: true,
          userId: true,
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
