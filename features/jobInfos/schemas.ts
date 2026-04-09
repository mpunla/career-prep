import { experienceLevels } from "@/drizzle/schema";
import z from "zod";

export const jobInfoSchema = z.object({
  description: z.string().min(1, "Required"),
  experienceLevel: z.enum(experienceLevels),
  name: z.string().min(1, "Required"),
  title: z.string().min(1).nullable(),
});
