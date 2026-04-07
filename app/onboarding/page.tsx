import { OnboardingClient } from "@/app/onboarding/_client";
import { getCurrentUser } from "@/app/services/clerk/lib/getCurrentUser";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const { user, userId } = await getCurrentUser({ allData: true });

  if (!userId) {
    return redirect("/");
  }
  if (user) {
    return redirect("/app");
  }

  return (
    <div className="container flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl">Creating your account...</h1>
      <OnboardingClient userId={userId} />
    </div>
  );
}
