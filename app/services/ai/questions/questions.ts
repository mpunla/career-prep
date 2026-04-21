import {
  interviewQuestionSystemPrompt,
  questionFeedbackSystemPrompt,
} from "@/app/services/ai/questions/systemPrompt";
import {
  JobInfoTable,
  QuestionDifficulty,
  QuestionTable,
} from "@/drizzle/schema";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export function generateAiQuestion({
  difficulty,
  jobInfo,
  onFinish,
  previousQuestions,
}: {
  difficulty: QuestionDifficulty;
  jobInfo: Pick<
    typeof JobInfoTable.$inferSelect,
    "description" | "experienceLevel" | "title"
  >;
  previousQuestions: Pick<
    typeof QuestionTable.$inferSelect,
    "difficulty" | "text"
  >[];
  onFinish: (question: string) => void;
}) {
  const previousMessages = previousQuestions.flatMap((q) => [
    { role: "user", content: q.difficulty },
    { role: "assistant", content: q.text },
  ]);

  return streamText({
    experimental_continueSteps: true,
    maxSteps: 10,
    messages: [
      ...previousMessages,
      {
        role: "user",
        content: difficulty,
      },
    ],
    model: google("gemini-2.5-flash"),
    onFinish: ({ text }) => onFinish(text),
    system: interviewQuestionSystemPrompt(jobInfo),
  });
}

export function generateAiQuestionFeedback({
  answer,
  question,
}: {
  answer: string;
  question: string;
}) {
  return streamText({
    experimental_continueSteps: true,
    maxSteps: 10,
    model: google("gemini-2.5-flash"),
    prompt: answer,
    system: questionFeedbackSystemPrompt(question),
  });
}
