import { aiAnalyzeSchema } from "@/services/ai/resumes/schema";
import { analyzeResumeSystemPrompt } from "@/services/ai/resumes/systemPrompt";
import { JobInfoTable } from "@/drizzle/schema";
import { google } from "@ai-sdk/google";
import { Output, streamText } from "ai";

export async function analyzeResumeForJob({
  jobInfo,
  resumeFile,
}: {
  jobInfo: Pick<
    typeof JobInfoTable.$inferSelect,
    "description" | "experienceLevel" | "title"
  >;
  resumeFile: File;
}) {
  return streamText({
    messages: [
      {
        role: "user",
        content: [
          {
            data: await resumeFile.arrayBuffer(),
            mediaType: resumeFile.type,
            type: "file",
          },
        ],
      },
    ],
    model: google("gemini-2.5-flash"),
    output: Output.object({ schema: aiAnalyzeSchema }),
    system: analyzeResumeSystemPrompt(jobInfo),
  });
}
