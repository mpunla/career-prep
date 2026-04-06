import { env } from "@/data/env/server";
import { drizzle } from "drizzle-orm/neon-http";

export const db = drizzle(env.DATABASE_URL);
