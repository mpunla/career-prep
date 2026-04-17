import { BackLink } from "@/components/BackLink";
import { JobInfoTable } from "@/drizzle/schema";

export function NewQuestionClientPage({
  jobInfo,
}: {
  jobInfo: Pick<typeof JobInfoTable.$inferSelect, "id" | "name" | "title">;
}) {
  return (
    <div className="flex flex-col gap-4 grow h-screen-header items-center mx-auto mx-w-[2000px] w-full">
      <div className="container flex gap-4 items-center justify-between mt-4">
        <div className="basis-0 grow">
          <BackLink href={`/dashboard/job-infos/${jobInfo.id}`}>
            {jobInfo.name}
          </BackLink>
        </div>
        <Controls />
        <div className="grow hidden md:block" />
      </div>
      <QuestionsContainer />
    </div>
  );
}

function QuestionsContainer() {
  return null;
}

function Controls() {
  return (
    <div className="flex gap-2">
      <button
        type="submit"
        form="question-form"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Save
      </button>
    </div>
  );
}
