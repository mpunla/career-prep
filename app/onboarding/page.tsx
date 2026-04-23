import { FullScreenLoader } from "@/app/dashboard/_components/FullScreenLoader";
import { OnboardingClient } from "@/app/onboarding/_components/OnboardingClient";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function OnboardingPage() {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <SuspendedComponent />
    </Suspense>
  );
}

async function SuspendedComponent() {
  const { user, userId } = await getCurrentUser({ allData: true });
  if (!userId) {
    return redirect("/");
  }
  if (user) {
    return redirect("/dashboard");
  }

  return (
    <div className="container flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl">Creating your account...</h1>
      <OnboardingClient userId={userId} />
    </div>
  );
}
