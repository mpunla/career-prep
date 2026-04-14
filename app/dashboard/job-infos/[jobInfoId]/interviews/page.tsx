import { JobInfoBackLink } from "@/app/dashboard/_components/JobInfoBackLink";
import { getCurrentUser } from "@/app/services/clerk/lib/getCurrentUser";
import { getInterviews } from "@/features/interviews/actions";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function InterviewPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>;
}) {
  const { jobInfoId } = await params;

  return (
    <div className="container flex flex-col gap-4 h-screen-reader items-start py-4 space-y-4">
      <JobInfoBackLink jobInfoId={jobInfoId} />

      <Suspense
        fallback={<Loader2 className="animate-spin m-auto size-24" />}
      >
        <SuspendedPage jobInfoId={jobInfoId} />
      </Suspense>
    </div>
  );
}

async function SuspendedPage({ jobInfoId }: { jobInfoId: string }) {
  const { redirectToSignIn, userId } = await getCurrentUser();
  if (!userId) return redirectToSignIn();

  const interviews = await getInterviews(jobInfoId, userId);
  if (!interviews || interviews.length === 0) {
    return redirect(`/dashboard/job-infos/${jobInfoId}/interviews/new`);
  }

  return (
    <div>Interviews</div>
  );
}
