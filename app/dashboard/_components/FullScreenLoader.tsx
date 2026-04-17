import { Loader2Icon } from "lucide-react";

export function FullScreenLoader() {
  return (
    <div className="h-screen-header items-center justify-center flex ">
      <Loader2Icon className="animate-spin size-24" />
    </div>
  );
}
