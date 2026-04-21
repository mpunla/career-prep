import { analyzeResumeForJob } from "@/app/services/ai/resumes/resumes";
import { getCurrentUser } from "@/app/services/clerk/lib/getCurrentUser";
import { getUserJobInfo } from "@/features/jobInfos/actions";

export async function POST(req: Request) {
  const { userId } = await getCurrentUser();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const formData = await req.formData();
  const resumeFile = formData.get("resumeFile") as File;
  const jobInfoId = formData.get("jobInfoId") as string;
  if (!resumeFile || !jobInfoId) {
    return new Response("Invalid input", { status: 400 });
  }

  if (resumeFile.size > 10 * 1024 * 1024) {
    return new Response("File size exceeds 10MB limit", { status: 400 })
  }

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ]
  if (!allowedTypes.includes(resumeFile.type)) {
    return new Response("Please upload a PDF, Word document, or text file", {
      status: 400,
    })
  }

  const jobInfo = await getUserJobInfo(jobInfoId, userId);
  if (!jobInfo) {
    return new Response("Unauthorized", { status: 403 });
  }

  const res = await analyzeResumeForJob({
    resumeFile,
    jobInfo,
  })

  return res.toTextStreamResponse()
}
