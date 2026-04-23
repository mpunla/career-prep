import { FeedbackItem } from "@/app/dashboard/job-infos/[jobInfoId]/resume/_components/FeedbackItem"
import { aiAnalyzeSchema } from "@/services/ai/resumes/schema"
import { Skeleton } from "@/components/Skeleton"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DeepPartial } from "ai"
import { ReactNode } from "react"
import z from "zod"

type Keys = Exclude<keyof z.infer<typeof aiAnalyzeSchema>, "overallScore">

export function AnalysisResults({
  aiAnalysis,
  isLoading,
}: {
  aiAnalysis: DeepPartial<z.infer<typeof aiAnalyzeSchema>> | undefined
  isLoading: boolean
}) {
  if (!isLoading && aiAnalysis == null) return null

  const sections: Record<Keys, string> = {
    ats: "Applicant Tracking Systems (ATS) Compatibility",
    jobMatch: "Job Match",
    writingAndFormatting: "Writing and Formatting",
    keywordCoverage: "Keyword Coverage",
    other: "Additional Insights",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
        <CardDescription>
          {aiAnalysis?.overallScore == null ? (
            <Skeleton className="w-32" />
          ) : (
            `Overall Score: ${aiAnalysis.overallScore}/10`
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple">
          {Object.entries(sections).map(([key, title]) => {
            const category = aiAnalysis?.[key as Keys]
            return (
              <AccordionItem value={title} key={key}>
                <AccordionTrigger>
                  <CategoryAccordionHeader
                    title={title}
                    score={category?.score}
                  />
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="text-muted-foreground">
                      {category?.summary == null ? (
                        <span className="space-y-2">
                          <Skeleton />
                          <Skeleton className="w-3/4" />
                        </span>
                      ) : (
                        category.summary
                      )}
                    </div>
                    <div className="space-y-3">
                      {category?.feedback == null ? (
                        <>
                          <Skeleton className="h-16" />
                          <Skeleton className="h-16" />
                          <Skeleton className="h-16" />
                        </>
                      ) : (
                        category.feedback.map((item, index) => {
                          if (item == null) return null
                          return <FeedbackItem key={index} {...item} />
                        })
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </CardContent>
    </Card>
  )
}

function CategoryAccordionHeader({
  title,
  score,
}: {
  title: string
  score: number | undefined | null
}) {
  let badge: ReactNode
  if (score == null) {
    badge = <Skeleton className="w-16" />
  } else if (score >= 8) {
    badge = <Badge>Excellent</Badge>
  } else if (score >= 6) {
    badge = <Badge variant="warning">Satisfactory</Badge>
  } else {
    badge = <Badge variant="destructive">Needs Work</Badge>
  }

  return (
    <div className="flex items-start justify-between w-full">
      <div className="flex flex-col items-start gap-1">
        <span>{title}</span>
        <div className="no-underline">{badge}</div>
      </div>
      {score == null ? <Skeleton className="w-12" /> : `${score}/10`}
    </div>
  )
}