"use client";

import { CondensedMessages } from "@/app/dashboard/job-infos/[jobInfoId]/interviews/new/_components/CondensedMessages";
import { condenseChatMessages } from "@/services/hume/lib/condenseChatMessages";
import { useVoice } from "@humeai/voice-react";
import { useMemo } from "react";

export function Messages({ user }: { user: { name: string; imageUrl: string } }) {
  const { messages, fft } = useVoice();

  const condensedMessages = useMemo(() => {
    return condenseChatMessages(messages);
  }, [messages]);

  return (
    <CondensedMessages
      className="max-w-5xl"
      maxFft={Math.max(...fft)}
      messages={condensedMessages}
      user={user}
    />
  );
}