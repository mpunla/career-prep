import { FullScreenLoader } from "@/app/dashboard/_components/FullScreenLoader";
import { JobInfos } from "@/app/dashboard/_components/JobInfos";
import { Suspense } from "react";

export default function AppPage() {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <JobInfos />
    </Suspense>
  );
}
