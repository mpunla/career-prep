import { JobInfos } from "@/app/dashboard/_components/JobInfos";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

export default function AppPage() {
  return (
    <Suspense fallback={<AppPageFallback />}>
      <JobInfos />
    </Suspense>
  );
}

function AppPageFallback() {
  return (
    <div className="h-screen-header flex items-center justify-center">
      <Loader2Icon className="animate-spin size-24" />
    </div>
  );
}
