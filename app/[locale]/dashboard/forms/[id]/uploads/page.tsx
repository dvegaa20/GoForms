import {
  getQuestions,
  getResponses,
  processQuestions,
} from "@/../lib/actions/form_actions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/../components/ui/card";
import { cookies } from "next/headers";
import { ExternalLink, FileX2 } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
export default async function UploadsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const selectedOption = (await cookies()).get("selectedOption")?.value;
  const t = await getTranslations("UploadsTab");
  const [responses, formQuestions] = await Promise.all([
    getResponses({ id }),
    getQuestions({ id, selectedOption }),
  ]);

  const questionsArray = Array.isArray(formQuestions)
    ? formQuestions
    : [formQuestions];

  const questions = await processQuestions(questionsArray[0], responses);

  return (
    <div className="space-y-3.5">
      {questions.some((question) => question.question_type === "file") ? (
        questions.map(
          (question) =>
            question.question_type === "file" && (
              <Card key={question.order}>
                <hr className="w-full border-t-8 rounded-t-xl border-blue-800" />
                <CardHeader>
                  <CardTitle className="font-normal text-base">
                    {question.question_title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {question.responses.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {question.responses.map((response, responseIndex) => {
                        if (!response.value) return null;
                        return (
                          <div className="relative" key={responseIndex}>
                            <div className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md">
                              <a
                                href={response.value}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="w-4 h-4 text-primary" />
                              </a>
                            </div>
                            <Image
                              src={response.value}
                              alt={`${question.question_title} ${responseIndex + 1}`}
                              className="w-full h-32 object-cover rounded-lg border p-1"
                              width={100}
                              height={100}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
        )
      ) : (
        <div className="w-full mx-auto p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center text-center min-h-[300px]">
            <FileX2 className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {t("noUploads")}
            </h3>
            <p className="text-gray-500">{t("noUploadsDescription")}</p>
          </div>
        </div>
      )}
    </div>
  );
}
