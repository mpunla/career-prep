import { Status } from "@/app/dashboard/job-infos/[jobInfoId]/questions/_types/Status";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

export function QuestionContainer({
  answer,
  feedback,
  question,
  setAnswer,
  status,
}: {
  answer: string | null;
  feedback: string | null;
  question: string | null;
  setAnswer: (value: string) => void;
  status: Status;
}) {
  return (
    <ResizablePanelGroup className="grow border-t" orientation="horizontal">
      <ResizablePanel defaultSize={50} id="question-and-feedback" minSize={5}>
        <ResizablePanelGroup className="grow" orientation="vertical">
          <ResizablePanel defaultSize={25} id="question" minSize={5}>
            <ScrollArea className="h-full min-w-48 *:h-full">
              {status === "init" && !question ? (
                <p className="text-base md:text-lg flex items-center justify-center h-full p-6">
                  Get started by selecting a question difficulty above.
                </p>
              ) : (
                question && (
                  <MarkdownRenderer className="p-6">
                    {question}
                  </MarkdownRenderer>
                )
              )}
            </ScrollArea>
          </ResizablePanel>
          {feedback && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={75} id="feedback" minSize={5}>
                <ScrollArea className="h-full min-w-48 *:h-full">
                  <MarkdownRenderer className="p-6">
                    {feedback}
                  </MarkdownRenderer>
                </ScrollArea>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50} id="answer" minSize={5}>
        <ScrollArea className="h-full min-w-48 *:h-full">
          <Textarea
            className="w-full h-full resize-none border-none rounded-none focus-visible:ring focus-visible:ring-inset !text-base p-6"
            disabled={status !== "awaiting-answer"}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            value={answer ?? ""}
          />
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
