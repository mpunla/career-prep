"use server";

import { getCurrentUser } from "@/app/services/clerk/lib/getCurrentUser";
import { db } from "@/drizzle/db";
import { JobInfoTable } from "@/drizzle/schema";
import {
  insertJobInfo,
  updateJobInfo as updateJobInfoDb,
} from "@/features/jobInfos/db";
import {
  getJobInfoIdTag,
  getJobInfoUserTag,
} from "@/features/jobInfos/dbCache";
import { jobInfoSchema } from "@/features/jobInfos/schemas";
import { and, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

export async function createJobInfo(unsafeData: z.infer<typeof jobInfoSchema>) {
  const { userId } = await getCurrentUser();

  if (!userId) {
    return { error: true, message: "Unauthorized" };
  }

  const { data, success } = jobInfoSchema.safeParse(unsafeData);

  if (!success) {
    return { error: true, message: "Invalid job data" };
  }

  const jobInfo = await insertJobInfo({ ...data, userId });

  redirect(`/dashboard/job-infos/${jobInfo.id}`);
}

export async function updateJobInfo(
  id: string,
  unsafeData: z.infer<typeof jobInfoSchema>,
) {
  const { userId } = await getCurrentUser();
  if (!userId) {
    return { error: true, message: "Unauthorized" };
  }

  const { data, success } = jobInfoSchema.safeParse(unsafeData);
  if (!success) {
    return { error: true, message: "Invalid job data" };
  }

  const existingJobInfo = await getUserJobInfo(id, userId);
  if (!existingJobInfo) {
    return { error: true, message: "Job info not found" };
  }

  const jobInfo = await updateJobInfoDb(id, data);

  redirect(`/dashboard/job-infos/${jobInfo.id}`);
}

export async function getJobInfo(id: string) {
  "use cache"
  cacheTag(getJobInfoIdTag(id))

  return db.query.JobInfoTable.findFirst({
    where: eq(JobInfoTable.id, id),
  })
}

export async function getJobInfos(userId: string) {
  "use cache";
  cacheTag(getJobInfoUserTag(userId));

  return db.query.JobInfoTable.findMany({
    where: eq(JobInfoTable.userId, userId),
  });
}

export async function getUserJobInfo(id: string, userId: string) {
  "use cache";
  cacheTag(getJobInfoIdTag(id));

  return await db.query.JobInfoTable.findFirst({
    where: and(eq(JobInfoTable.id, id), eq(JobInfoTable.userId, userId)),
  });
}
