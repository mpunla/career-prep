import { getCurrentUser } from "@/app/services/clerk/lib/getCurrentUser"
import { Button } from "@/components/ui/button"
import { SignInButton } from "@clerk/nextjs"
import { BrainCircuitIcon } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

export function HomeNavbar() {
  return (
    <nav className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          <Link className="flex items-center gap-2" href="/">
            <BrainCircuitIcon className="size-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Career Prep</h1>
          </Link>
          <Suspense
            fallback={
              <SignInButton forceRedirectUrl="/dashboard">
                <Button variant="outline">Sign In</Button>
              </SignInButton>
            }
          >
            <NavButton />
          </Suspense>
        </div>
      </div>
    </nav>
  )
}


async function NavButton() {
  const { userId } = await getCurrentUser()

  if (!userId) {
    return (
      <SignInButton forceRedirectUrl="/dashboard">
        <Button variant="outline">Sign In</Button>
      </SignInButton>
    )
  }

  return (
    <Button asChild>
      <Link href="/dashboard">Dashboard</Link>
    </Button>
  )
}
