import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema";
import { revalidateUserCache } from "@/features/users/dbCache";
import { eq } from "drizzle-orm";

export async function deleteUser(id: string) {
  await db.delete(UserTable).where(eq(UserTable.id, id));

  revalidateUserCache(id);
}

export async function upsertUser(user: typeof UserTable.$inferInsert) {
  await db
    .insert(UserTable)
    .values(user)
    .onConflictDoUpdate({
      target: [UserTable.id],
      set: user,
    });

  revalidateUserCache(user.id);
}
