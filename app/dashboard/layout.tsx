import { Navbar } from "@/app/dashboard/_components/Navbar";
import { getCurrentUser } from "@/app/services/clerk/lib/getCurrentUser";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const { userId, user } = await getCurrentUser({ allData: true });

  if (!userId) return redirect("/");
  if (!user) return redirect("/onboarding");

  return (
    <>
      <Navbar user={user} />
      {children}
    </>
  );
}
