import { FullScreenLoader } from "@/app/dashboard/_components/FullScreenLoader";
import { getCurrentUser } from "@/app/services/clerk/lib/getCurrentUser";
import { getUserJobInfo } from "@/features/jobInfos/actions";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function QuestionsPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>;
}) {
  const { jobInfoId } = await params;
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <SuspendedComponent jobInfoId={jobInfoId} />
    </Suspense>
  );
}

async function SuspendedComponent({ jobInfoId }: { jobInfoId: string }) {
  const { redirectToSignIn, userId } = await getCurrentUser();
  if (!userId) return redirectToSignIn();

  const jobInfo = await getUserJobInfo(jobInfoId, userId);
  if (!jobInfo) return notFound();

  return <NewQuestionClientPage />;
}
