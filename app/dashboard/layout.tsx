import { Navbar } from "@/app/dashboard/_components/Navbar";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { Loader2Icon } from "lucide-react";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";

export default async function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<Loader2Icon className="animate-spin m-auto size-24" />}>
      <SuspendedNavbar />
      {children}
    </Suspense>
  );
}

async function SuspendedNavbar() {
  const { userId, user } = await getCurrentUser({ allData: true });

  if (!userId) return redirect("/");
  if (!user) return redirect("/onboarding");

  return <Navbar user={user} />;
}
