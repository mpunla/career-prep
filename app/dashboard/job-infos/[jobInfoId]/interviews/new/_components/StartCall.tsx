"use client";

import { FullScreenLoader } from "@/app/dashboard/_components/FullScreenLoader";
import { Controls } from "@/app/dashboard/job-infos/[jobInfoId]/interviews/new/_components/Controls";
import { Messages } from "@/app/dashboard/job-infos/[jobInfoId]/interviews/new/_components/Messages";
import { Button } from "@/components/ui/button";
import { env } from "@/data/env/client";
import { JobInfoTable } from "@/drizzle/schema";
import {
  createInterview,
  updateInterview,
} from "@/features/interviews/actions";
import { errorToast } from "@/lib/errorToast";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function StartCall({
  jobInfo,
  user,
  accessToken,
}: {
  accessToken: string;
  jobInfo: Pick<
    typeof JobInfoTable.$inferSelect,
    "description" | "experienceLevel" | "id" | "title"
  >;
  user: {
    name: string;
    imageUrl: string;
  };
}) {
  const { connect, readyState, chatMetadata, callDurationTimestamp } =
    useVoice();
  const router = useRouter();
  const [interviewId, setInterviewId] = useState<string | null>(null);
  const durationRef = useRef(callDurationTimestamp);
  durationRef.current = callDurationTimestamp;

  const handleClickStartInterview = async () => {
    const res = await createInterview(jobInfo.id);
    if (res.error) {
      return errorToast(res.message);
    }
    setInterviewId(res.id);

    connect({
      auth: { type: "accessToken", value: accessToken },
      configId: env.NEXT_PUBLIC_HUME_CONFIG_ID,
      sessionSettings: {
        type: "session_settings",
        variables: {
          description: jobInfo.description,
          experienceLevel: jobInfo.experienceLevel,
          title: jobInfo.title || "Not Specified",
          userName: user.name,
        },
      },
    });
  };

  // Sync chat ID
  useEffect(() => {
    if (chatMetadata?.chatId == null || interviewId == null) {
      return;
    }
    updateInterview(interviewId, { humeChatId: chatMetadata.chatId });
  }, [chatMetadata?.chatId, interviewId]);

  // Sync duration
  useEffect(() => {
    if (interviewId == null) return;
    const intervalId = setInterval(() => {
      if (durationRef.current == null) return;

      updateInterview(interviewId, { duration: durationRef.current });
    }, 10000);

    return () => clearInterval(intervalId);
  }, [interviewId]);

  // Handle disconnect
  useEffect(() => {
    if (readyState !== VoiceReadyState.CLOSED) return;
    if (!interviewId) {
      return router.push(`/dashboard/job-infos/${jobInfo.id}/interviews`);
    }

    if (durationRef.current !== null) {
      updateInterview(interviewId, { duration: durationRef.current });
    }
    router.push(`/dashboard/job-infos/${jobInfo.id}/interviews/${interviewId}`);
  }, [interviewId, jobInfo.id, readyState, router]);

  if (readyState === VoiceReadyState.IDLE) {
    return (
      <div className="flex justify-center items-center h-screen-header">
        <Button onClick={handleClickStartInterview} size="lg">
          Start Interview
        </Button>
      </div>
    );
  }

  if (
    readyState === VoiceReadyState.CONNECTING ||
    readyState === VoiceReadyState.CLOSED
  ) {
    return <FullScreenLoader />;
  }

  return (
    <div className="overflow-y-auto h-screen-header flex flex-col-reverse">
      <div className="container py-6 flex flex-col items-center justify-end gap-4">
        <Messages user={user} />
        <Controls />
      </div>
    </div>
  );
}
