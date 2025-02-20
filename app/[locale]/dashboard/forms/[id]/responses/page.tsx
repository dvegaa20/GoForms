import {
  getQuestions,
  getResponses,
  processQuestions,
} from "@/../lib/actions/form_actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/../components/ui/card";
import BarChart from "@/../components/go_form/form/responses/BarChart";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

export default async function ResponsesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const selectedOption = (await cookies()).get("selectedOption")?.value;
  const t = await getTranslations("ResponsesTab");

  const [responses, formQuestions] = await Promise.all([
    getResponses({ id }),
    getQuestions({ id, selectedOption }),
  ]);

  const questions = await processQuestions(formQuestions?.[0], responses);

  return (
    <div className="space-y-3.5">
      {questions.map((question) => {
        const validResponses = Object.entries(
          question.numberOfResponses
        ).filter(([key]) => key !== "");

        const emptyResponsesCount = question.numberOfResponses[""] || 0;

        return question.question_type === "file" ||
          (validResponses.length === 0 && emptyResponsesCount === 0) ? null : (
          <Card key={question.order}>
            <CardHeader>
              <CardTitle className="font-normal text-base">
                {question.question_title}
              </CardTitle>
              <CardDescription className="text-xs">
                {[
                  ...validResponses.map(
                    ([key, value]) =>
                      `${value} ${value === 1 ? t("answer") : t("answers")} "${key}"`
                  ),
                  ...(emptyResponsesCount > 0
                    ? [
                        `${emptyResponsesCount} ${t(
                          emptyResponsesCount === 1
                            ? "noAnswerSingle"
                            : "noAnswerPlural"
                        )}`,
                      ]
                    : []),
                ].join(", ")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart responses={question.responses} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
