import { getGlobalTag, getIdTag, getJobInfoTag } from "@/lib/dataCache";
import { revalidateTag, updateTag } from "next/cache";

export function getInterviewGlobalTag() {
  return getGlobalTag("interviews");
}

export function getInterviewIdTag(id: string) {
  return getIdTag("interviews", id);
}

export function getInterviewJobInfoTag(jobInfoId: string) {
  return getJobInfoTag("interviews", jobInfoId);
}

export function revalidateInterviewCache({
  id,
  jobInfoId,
}: {
  id: string;
  jobInfoId: string;
}) {
  revalidateTag(getInterviewGlobalTag(), "max");
  revalidateTag(getInterviewJobInfoTag(jobInfoId), "max");
  updateTag(getInterviewIdTag(id));
}
