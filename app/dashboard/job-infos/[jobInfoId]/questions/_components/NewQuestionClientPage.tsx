"use client";

import { Controls } from "@/app/dashboard/job-infos/[jobInfoId]/questions/_components/Controls";
import { QuestionContainer } from "@/app/dashboard/job-infos/[jobInfoId]/questions/_components/QuestionsController";
import { Status } from "@/app/dashboard/job-infos/[jobInfoId]/questions/_types/Status";
import { BackLink } from "@/components/BackLink";
import { JobInfoTable, QuestionDifficulty } from "@/drizzle/schema";
import { errorToast } from "@/lib/errorToast";
import { useCompletion } from "@ai-sdk/react";
import { useState } from "react";

export function NewQuestionClientPage({
  jobInfo,
}: {
  jobInfo: Pick<typeof JobInfoTable.$inferSelect, "id" | "name" | "title">;
}) {
  const [status, setStatus] = useState<Status>("init");
  const [answer, setAnswer] = useState<string | null>(null);

  const {
    complete: generateQuestion,
    completion: question,
    isLoading: isGeneratingQuestion,
    setCompletion: setQuestion,
  } = useCompletion({
    api: "/api/ai/questions/generate-question",
    onError: (error) => {
      errorToast(error.message);
    },
    onFinish: () => {
      setStatus("awaiting-answer");
    },
  });

  const {
    complete: generateFeedback,
    completion: feedback,
    isLoading: isGeneratingFeedback,
    setCompletion: setFeedback,
  } = useCompletion({
    api: "/api/ai/questions/generate-feedback",
    onError: (error) => {
      errorToast(error.message);
    },
    onFinish: () => {
      setStatus("awaiting-difficulty");
    },
  });

  function handleGenerateFeedback() {
    if (!answer || answer.trim() === "" || !question) return;

    generateFeedback(answer?.trim(), { body: { question } });
  }

  function handleGenerateQuestion(difficulty: QuestionDifficulty) {
    setQuestion("");
    setFeedback("");
    setAnswer(null);
    generateQuestion(difficulty, { body: { jobInfoId: jobInfo.id } });
  }

  function handleReset() {
    setStatus("init");
    setQuestion("");
    setFeedback("");
    setAnswer(null);
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full mx-w-[2000px] mx-auto grow h-screen-header">
      <div className="container flex gap-4 mt-4 items-center justify-between">
        <div className="grow basis-0">
          <BackLink href={`/dashboard/job-infos/${jobInfo.id}`}>
            {jobInfo.name}
          </BackLink>
        </div>
        <Controls
          generateFeedback={handleGenerateFeedback}
          generateQuestion={(difficulty) => handleGenerateQuestion(difficulty)}
          isDisabled={!answer || answer.trim() === "" || !question}
          isLoading={isGeneratingFeedback || isGeneratingQuestion}
          reset={handleReset}
          status={status}
        />
        <div className="grow hidden md:block" />
      </div>
      <QuestionContainer
        answer={answer}
        feedback={feedback}
        question={question}
        setAnswer={setAnswer}
        status={status}
      />
    </div>
  );
}
