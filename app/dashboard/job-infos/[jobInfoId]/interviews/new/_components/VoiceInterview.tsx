import { StartCall } from "@/app/dashboard/job-infos/[jobInfoId]/interviews/new/_components/StartCall";
import { getCurrentUser } from "@/app/services/clerk/lib/getCurrentUser";
import { env } from "@/data/env/server";
import { getUserJobInfo } from "@/features/jobInfos/actions";
import { VoiceProvider } from "@humeai/voice-react";
import { fetchAccessToken } from "hume";
import { notFound } from "next/navigation";

export async function VoiceInterview({ jobInfoId }: { jobInfoId: string }) {
  const { redirectToSignIn, user, userId } = await getCurrentUser({
    allData: true,
  });
  if (!user || !userId) return redirectToSignIn();

  const jobInfo = await getUserJobInfo(jobInfoId, userId);
  if (!jobInfo) return notFound();

  const accessToken = await fetchAccessToken({
    apiKey: env.HUME_API_KEY,
    secretKey: env.HUME_SECRET_KEY,
  });

  return (
    <VoiceProvider>
        <StartCall accessToken={accessToken} jobInfo={jobInfo} user={user} />
    </VoiceProvider>
  )
}
