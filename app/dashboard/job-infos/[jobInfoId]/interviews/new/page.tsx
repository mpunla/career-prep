import { VoiceInterview } from "@/app/dashboard/job-infos/[jobInfoId]/interviews/new/_components/VoiceInterview";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

export default async function NewInterviewPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>;
}) {
  const { jobInfoId } = await params;

  return (
    <Suspense fallback={<NewInterviewFallback />}>
      <VoiceInterview jobInfoId={jobInfoId} />
    </Suspense>
  );
}

function NewInterviewFallback() {
  return (
    <div className="h-screen-header flex items-center justify-center">
      <Loader2Icon className="animate-spin size-24" />
    </div>
  );
}
