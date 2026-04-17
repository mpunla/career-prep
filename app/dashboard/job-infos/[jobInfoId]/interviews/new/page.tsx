import { FullScreenLoader } from "@/app/dashboard/_components/FullScreenLoader";
import { VoiceInterview } from "@/app/dashboard/job-infos/[jobInfoId]/interviews/new/_components/VoiceInterview";
import { Suspense } from "react";

export default async function NewInterviewPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>;
}) {
  const { jobInfoId } = await params;

  return (
    <Suspense fallback={<FullScreenLoader />}>
      <VoiceInterview jobInfoId={jobInfoId} />
    </Suspense>
  );
}
