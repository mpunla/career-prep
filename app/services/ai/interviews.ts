import { JobInfoTable } from "@/drizzle/schema";
import { fetchChatMessages } from "@/app/services/hume/lib/fetchChatMessages";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { feedbackSystemPrompt } from "@/app/services/ai/feedbackSystemPrompt";

export async function generateAiInterviewFeedback({
  humeChatId,
  jobInfo,
  userName,
}: {
  humeChatId: string;
  jobInfo: Pick<
    typeof JobInfoTable.$inferSelect,
    "title" | "description" | "experienceLevel"
  >;
  userName: string;
}) {
  const messages = await fetchChatMessages(humeChatId);

  const formattedMessages = messages
    .map((message) => {
      if (message.type !== "USER_MESSAGE" && message.type !== "AGENT_MESSAGE") {
        return null;
      }
      if (message.messageText == null) return null;

      return {
        emotionFeatures:
          message.role === "USER" ? message.emotionFeatures : undefined,
        speaker:
          message.type === "USER_MESSAGE" ? "interviewee" : "interviewer",
        text: message.messageText,
      };
    })
    .filter((f) => f != null);

  const { text } = await generateText({
    experimental_continueSteps: true,
    maxSteps: 10,
    model: google("gemini-2.5-flash"),
    prompt: JSON.stringify(formattedMessages),
    system: feedbackSystemPrompt({
      jobInfo,
      userName,
    }),
  });

  return text;
}
