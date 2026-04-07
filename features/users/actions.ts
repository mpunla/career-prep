"use server";

import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema";
import { getUserIdTag } from "@/features/users/dbCache";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/cache";

export async function getUser(userId: string) {
  "use cache";
  cacheTag(getUserIdTag(userId));

  return db.query.UserTable.findFirst({
    where: eq(UserTable.id, userId),
  });
}
