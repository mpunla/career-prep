import { generateAiQuestion } from "@/app/services/ai/questions/questions";
import { getCurrentUser } from "@/app/services/clerk/lib/getCurrentUser";
import { questionDifficulties } from "@/drizzle/schema";
import { getUserJobInfo } from "@/features/jobInfos/actions";
import { getQuestions } from "@/features/questions/actions";
import { insertQuestion } from "@/features/questions/db";
import { createUIMessageStream, createUIMessageStreamResponse } from "ai";
import z from "zod";

const schema = z.object({
  jobInfoId: z.string().min(1),
  prompt: z.enum(questionDifficulties),
});

export async function POST(req: Request) {
  const body = await req.json();
  const result = schema.safeParse(body);

  if (!result.success) {
    return new Response("Error generating your question", { status: 400 });
  }

  const { prompt: difficulty, jobInfoId } = result.data;
  const { userId } = await getCurrentUser();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const jobInfo = await getUserJobInfo(jobInfoId, userId);
  if (!jobInfo) {
    return new Response("Unauthorized", { status: 403 });
  }

  const previousQuestions = await getQuestions(jobInfoId);

  return createUIMessageStreamResponse({
    status: 200,
    stream: createUIMessageStream({
      async execute({ writer }) {
        const result = generateAiQuestion({
          previousQuestions,
          jobInfo,
          difficulty,
          onFinish: async (question) => {
            await insertQuestion({
              text: question,
              jobInfoId,
              difficulty,
            });
          },
        });

        writer.merge(result.toUIMessageStream());
      },
    }),
  });
}
