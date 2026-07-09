import { generateAiQuestionFeedback } from "@/services/ai/questions/questions";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { createUIMessageStream, createUIMessageStreamResponse } from "ai";
import z from "zod";

const schema = z.object({
  prompt: z.string().min(1),
  question: z.string().min(1),
});

export async function POST(req: Request) {
  const body = await req.json();
  const result = schema.safeParse(body);

  if (!result.success) {
    return new Response("Error generating your feedback", { status: 400 });
  }

  const { prompt: answer, question } = result.data;
  const { userId } = await getCurrentUser();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!question) {
    return new Response("Question does not exist", {
      status: 403,
    });
  }

  return createUIMessageStreamResponse({
    status: 200,
    stream: createUIMessageStream({
      async execute({ writer }) {
        const result = generateAiQuestionFeedback({
          answer,
          question: question,
        });

        writer.merge(result.toUIMessageStream());
      },
    }),
  });
}
