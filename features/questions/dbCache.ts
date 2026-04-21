import { getGlobalTag, getIdTag, getJobInfoTag } from "@/lib/dataCache";
import { revalidateTag, updateTag } from "next/cache";

export function getQuestionGlobalTag() {
  return getGlobalTag("questions");
}

export function getQuestionIdTag(id: string) {
  return getIdTag("questions", id);
}

export function getQuestionJobInfoTag(jobInfoId: string) {
  return getJobInfoTag("questions", jobInfoId);
}

export function revalidateQuestionCache({
  id,
  jobInfoId,
}: {
  id: string;
  jobInfoId: string;
}) {
  revalidateTag(getQuestionGlobalTag(), "max");
  revalidateTag(getQuestionJobInfoTag(jobInfoId), "max");
  updateTag(getQuestionIdTag(id));
}
