"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { experienceLevels, JobInfoTable } from "@/drizzle/schema/jobInfo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { jobInfoSchema } from "@/features/jobInfos/schemas";
import { formatExperienceLevel } from "@/app/dashboard/_lib/formatters";
import { createJobInfo, updateJobInfo } from "@/features/jobInfos/actions";
import { toast } from "sonner";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

type JobInfoFormData = z.infer<typeof jobInfoSchema>;

export function JobInfoForm({
  jobInfo,
}: {
  jobInfo?: Pick<
    typeof JobInfoTable.$inferSelect,
    "description" | "experienceLevel" | "id" | "name" | "title"
  >;
}) {
  const form = useForm<JobInfoFormData>({
    resolver: zodResolver(jobInfoSchema),
    defaultValues: jobInfo ?? {
      name: "",
      title: null,
      description: "",
      experienceLevel: "junior",
    },
  });

  async function onSubmit(values: JobInfoFormData) {
    const action = jobInfo
      ? updateJobInfo.bind(null, jobInfo.id)
      : createJobInfo;
    const res = await action(values);

    if (res.error) {
      toast.error(res.message);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Name</FieldLabel>
              <Input {...field} aria-invalid={fieldState.invalid} />
              <FieldDescription>
                This name is displayed in the UI for easy identification.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          <Controller
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Job Title</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  onChange={(e) => field.onChange(e.target.value || null)}
                  value={field.value ?? ""}
                />
                <FieldDescription>
                  Optional. Only enter if there is a specific job title you are
                  applying for.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="experienceLevel"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Experience Level</FieldLabel>
                <Select
                  aria-invalid={fieldState.invalid}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {formatExperienceLevel(level)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <Controller
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Description</FieldLabel>
              <Textarea
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Full-Stack web developer role specializing in React, Next.js, and PostgreSQL."
              />
              <FieldDescription>
                Specific job details and requirements. This description is used
                to accurately determine relevant questions and feedback when
                practicing interviews, answering technical questions, and
                analyzing your resume.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full"
        >
          <LoadingSwap isLoading={form.formState.isSubmitting}>
            Save Job Information
          </LoadingSwap>
        </Button>
      </FieldGroup>
    </form>
  );
}
