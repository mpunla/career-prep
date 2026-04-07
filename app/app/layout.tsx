import { Navbar } from "@/app/app/_Navbar";
import { getCurrentUser } from "@/app/services/clerk/lib/getCurrentUser";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const { userId, user } = await getCurrentUser({ allData: true });

  if (userId == null) return redirect("/");
  if (user == null) return redirect("/onboarding");

  return (
    <>
      <Navbar user={user} />
      {children}
    </>
  );
}
