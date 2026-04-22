import { FullScreenLoader } from "@/app/dashboard/_components/FullScreenLoader";
import { JobInfos } from "@/app/dashboard/_components/JobInfos";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <JobInfos />
    </Suspense>
  );
}
