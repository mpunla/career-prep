"use client";

import { FftVisualizer } from "@/app/dashboard/job-infos/[jobInfoId]/interviews/new/_components/FftVisualizer";
import { Button } from "@/components/ui/button";
import { useVoice } from "@humeai/voice-react";
import { MicIcon, MicOffIcon, PhoneOffIcon } from "lucide-react";

export function Controls() {
  const { disconnect, isMuted, mute, unmute, micFft, callDurationTimestamp } =
    useVoice();

  return (
    <div className="flex gap-5 rounded border px-5 py-2 w-fit sticky bottom-6 bg-background items-center">
      <Button
        className="-mx-3"
        onClick={() => (isMuted ? unmute() : mute())}
        size="icon"
        variant="ghost"
      >
        {isMuted ? <MicOffIcon className="text-destructive" /> : <MicIcon />}
        <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
      </Button>
      <div className="self-stretch">
        <FftVisualizer fft={micFft} />
      </div>
      <div className="text-sm text-muted-foreground tabular-nums">
        {callDurationTimestamp}
      </div>
      <Button
        className="-mx-3"
        onClick={disconnect}
        size="icon"
        variant="ghost"
      >
        <PhoneOffIcon className="text-destructive" />
        <span className="sr-only">End Call</span>
      </Button>
    </div>
  );
}
