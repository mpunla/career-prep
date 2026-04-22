import { FullScreenLoader } from "@/app/dashboard/_components/FullScreenLoader";
import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <SuspendedComponent />
    </Suspense>
  );
}

function SuspendedComponent() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <SignIn />
    </div>
  );
}
