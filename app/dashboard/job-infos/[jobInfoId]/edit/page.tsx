import { JobInfoBackLink } from "@/app/dashboard/_components/JobInfoBackLink"
import { JobInfoForm } from "@/app/dashboard/_components/JobInfoForm"
import { getCurrentUser } from "@/app/services/clerk/lib/getCurrentUser"
import { Card, CardContent } from "@/components/ui/card"
import { getUserJobInfo } from "@/features/jobInfos/actions"
import { Loader2Icon } from "lucide-react"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export default async function JobInfoNewPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>
}) {
  const { jobInfoId } = await params

  return (
    <div className="container my-4 max-w-5xl space-y-4">
      <JobInfoBackLink jobInfoId={jobInfoId} />

      <h1 className="text-3xl md:text-4xl">Edit Job Description</h1>

      <Card>
        <CardContent>
          <Suspense
            fallback={<Loader2Icon className="size-24 animate-spin mx-auto" />}
          >
            <SuspendedForm jobInfoId={jobInfoId} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

async function SuspendedForm({ jobInfoId }: { jobInfoId: string }) {
  const { userId, redirectToSignIn } = await getCurrentUser()
  if (!userId) return redirectToSignIn()

  const jobInfo = await getUserJobInfo(jobInfoId, userId)
  if (!jobInfo) return notFound()

  return <JobInfoForm jobInfo={jobInfo} />
}
