import { getQuestions, getResponses, processQuestions } from "@/../lib/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BarChart from "@/components/go_form/form/responses/BarChart";

export default async function ResponsesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [responses, formQuestions] = await Promise.all([
    getResponses({ id }),
    getQuestions({ id }),
  ]);

  const questions = await processQuestions(formQuestions[0], responses);

  return (
    <div className="space-y-3.5">
      {questions.map((question) => (
        <Card key={question.order}>
          <CardHeader>
            <CardTitle className="font-normal text-base">
              {question.question_title}
            </CardTitle>
            <CardDescription className="text-xs">
              {Object.entries(question.numberOfResponses)
                .map(([key, value]) => `${value} answered "${key}"`)
                .join(", ")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(question.numberOfResponses).length > 0 ? (
              <BarChart responses={question.responses} />
            ) : (
              "No responses yet."
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
