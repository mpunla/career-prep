import { formatQuestionDifficulty } from "@/app/dashboard/job-infos/[jobInfoId]/questions/_lib/formatQuestionDifficulty";
import { Status } from "@/app/dashboard/job-infos/[jobInfoId]/questions/_types/Status";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { questionDifficulties, QuestionDifficulty } from "@/drizzle/schema";

export function Controls({
  generateFeedback,
  generateQuestion,
  isDisabled,
  isLoading,
  reset,
  status,
}: {
  generateFeedback: () => void;
  generateQuestion: (difficulty: QuestionDifficulty) => void;
  isDisabled: boolean;
  isLoading: boolean;
  reset: () => void;
  status: Status;
}) {
  return (
    <div className="flex gap-2">
      {status === "awaiting-answer" ? (
        <>
          <Button
            onClick={reset}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            <LoadingSwap isLoading={isLoading}>Skip</LoadingSwap>
          </Button>
          <Button onClick={generateFeedback} disabled={isDisabled} size="sm">
            <LoadingSwap isLoading={isLoading}>Answer</LoadingSwap>
          </Button>
        </>
      ) : (
        questionDifficulties.map((difficulty) => (
          <Button
            key={difficulty}
            size="sm"
            disabled={isLoading}
            onClick={() => generateQuestion(difficulty)}
          >
            <LoadingSwap isLoading={isLoading}>
              {formatQuestionDifficulty(difficulty)}
            </LoadingSwap>
          </Button>
        ))
      )}
    </div>
  );
}
