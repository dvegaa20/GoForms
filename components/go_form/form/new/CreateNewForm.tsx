"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, Trash2, GripVertical, FormInputIcon } from "lucide-react";
import { Button } from "@/../components/ui/button";
import { Input } from "@/../components/ui/input";
import { Label } from "@/../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/../components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/../components/ui/radio-group";
import { cn } from "@/../lib/utils";
import Link from "next/link";
import { attributeTypeToInputType } from "@/../types/types";
import { Reorder } from "framer-motion";
import { useFormStore } from "@/../store/store";
import { createForm } from "@/../lib/actions/form_actions";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function CreateForm() {
  const title = useFormStore((state) => state.title);
  const setTitle = useFormStore((state) => state.setTitle);
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isEditingMode, setIsEditingMode] = useState(true);
  const router = useRouter();
  const t = useTranslations("MainOrCreateForm");

  const handleQuestionChange = (
    order: number,
    field: keyof Question,
    value: string
  ) => {
    setQuestions(
      questions.map((q) => {
        if (q.order === order) {
          if (field === "question_type") {
            return {
              ...q,
              [field]: value as Question["question_type"],
              options: value === "radio" ? [""] : undefined,
            };
          }
          return { ...q, [field]: value };
        }
        return q;
      })
    );
  };

  const handleOptionChange = (order: number, index: number, value: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.order === order && q.options) {
          const newOptions = [...q.options];
          newOptions[index] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const handleAddOption = (order: number) => {
    setQuestions(
      questions.map((q) => {
        if (q.order === order && q.options) {
          return { ...q, options: [...q.options, ""] };
        }
        return q;
      })
    );
  };

  const handleRemoveOption = (order: number, index: number) => {
    setQuestions(
      questions.map((q) => {
        if (q.order === order && q.options) {
          const newOptions = q.options.filter((_, i) => i !== index);
          return { ...q, options: newOptions.length ? newOptions : [""] };
        }
        return q;
      })
    );
  };

  const handleAddQuestion = () => {
    const newOrder =
      questions.length > 0 ? Math.max(...questions.map((q) => q.order)) + 1 : 1;
    setQuestions([
      ...questions,
      {
        order: newOrder,
        question_type: "text",
        question_title: t("formQuestionTitle"),
        question_description: t("formQuestionDescription"),
      },
    ]);
  };

  const handleRemoveQuestion = (order: number) => {
    setQuestions(questions.filter((q) => q.order !== order));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createForm(title, description, topic, questions);
    router.push("/dashboard");
  };

  return (
    <main
      className={cn("max-w-3xl mx-auto pb-16 space-y-3.5", "pt-40 sm:pt-32")}
    >
      <Card>
        <hr className="w-full border-t-8 rounded-t-xl border-blue-800" />
        <CardHeader className="p-0 space-y-0" />
        <CardTitle className="text-3xl font-medium px-6 py-5">
          {isEditingMode ? (
            <div>
              <Input
                type="text"
                value={title}
                placeholder={t("formTitlePlaceholder")}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="border px-2 py-1 rounded w-full"
              />
              <div className="flex items-center space-x-2 pt-4">
                <Input
                  type="text"
                  value={description}
                  placeholder={t("formDescriptionPlaceholder")}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="border px-2 py-1 rounded w-full"
                />
                <Input
                  type="text"
                  value={topic}
                  placeholder={t("formTopicPlaceholder")}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                  className="border px-2 py-1 rounded w-80"
                />
              </div>
            </div>
          ) : (
            title
          )}
        </CardTitle>
      </Card>

      {questions.length > 0 ? (
        <form className="space-y-3.5" onSubmit={handleSubmit}>
          <Reorder.Group values={questions} onReorder={setQuestions}>
            {questions.map((question) => (
              <Reorder.Item key={question.order} value={question}>
                <Card key={question.order} className="my-3">
                  <CardContent className="space-y-2 pt-4">
                    {isEditingMode ? (
                      <div className="flex items-center space-x-2">
                        <Input
                          type="text"
                          value={question.question_title}
                          placeholder={t("formQuestionTitlePlaceholder")}
                          onChange={(e) =>
                            handleQuestionChange(
                              question.order,
                              "question_title",
                              e.target.value
                            )
                          }
                          className="border px-2 py-1 rounded w-full"
                        />
                        <Select
                          value={question.question_type}
                          onValueChange={(value: Question["question_type"]) =>
                            handleQuestionChange(
                              question.order,
                              "question_type",
                              value as Question["question_type"]
                            )
                          }
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select question type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">
                              {t("formOption1")}
                            </SelectItem>
                            <SelectItem value="radio">
                              {t("formOption2")}
                            </SelectItem>
                            <SelectItem value="number">
                              {t("formOption3")}
                            </SelectItem>
                            <SelectItem value="boolean">
                              {t("formOption4")}
                            </SelectItem>
                            <SelectItem value="file">
                              {t("formOption5")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveQuestion(question.order)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button type="button" variant="ghost" size="sm">
                          <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-between py-2">
                        <Label htmlFor={question.order.toString()}>
                          {question.question_title}
                        </Label>
                        <p className="text-[12px] font-medium text-primary">
                          {question.question_description}
                        </p>
                      </div>
                    )}
                    {question.question_type === "radio" ? (
                      <RadioGroup
                        disabled={!isEditingMode}
                        name={question.order.toString()}
                      >
                        {question.options?.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={option}
                              id={`${question.order}-option-${optionIndex}`}
                            />
                            {isEditingMode ? (
                              <Input
                                type="text"
                                value={option}
                                onChange={(e) =>
                                  handleOptionChange(
                                    question.order,
                                    optionIndex,
                                    e.target.value
                                  )
                                }
                                className="border px-2 py-1 rounded w-full"
                              />
                            ) : (
                              <Label
                                htmlFor={`${question.order}-option-${optionIndex}`}
                              >
                                {option}
                              </Label>
                            )}
                            {isEditingMode && (
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  handleRemoveOption(
                                    question.order,
                                    optionIndex
                                  )
                                }
                                disabled={question.options?.length === 1}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove option</span>
                              </Button>
                            )}
                          </div>
                        ))}
                        {isEditingMode && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleAddOption(question.order)}
                            className="mt-2"
                          >
                            {t("formAddOption")}
                          </Button>
                        )}
                      </RadioGroup>
                    ) : isEditingMode ? (
                      <div>
                        <Input
                          type="text"
                          value={question.question_description}
                          placeholder={t("formQuestionDescriptionPlaceholder")}
                          onChange={(e) => {
                            handleQuestionChange(
                              question.order,
                              "question_description",
                              e.target.value
                            );
                          }}
                          className="border px-2 py-1 rounded w-full"
                        />
                        <Input
                          type={
                            attributeTypeToInputType[question.question_type] ||
                            "text"
                          }
                          placeholder={t("formUserResponsePlaceholder")}
                          disabled
                          className="border px-2 py-1 rounded w-full mt-2"
                        />
                      </div>
                    ) : (
                      <>
                        <Input
                          type={
                            attributeTypeToInputType[question.question_type] ||
                            "text"
                          }
                          placeholder={t("formUserResponsePlaceholder")}
                          disabled
                          className="border px-2 py-1 rounded w-full mt-2"
                        />
                      </>
                    )}
                  </CardContent>
                </Card>
              </Reorder.Item>
            ))}
          </Reorder.Group>
          {isEditingMode ? (
            <div className="flex flex-col space-y-2 w-full">
              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  onClick={() => toast.success(t("toastSaveForm"))}
                >
                  {t("formSaveForm")}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditingMode(false)}
                >
                  {t("formPreviewForm")}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center mt-6">
              {t("formEditFormPreview")}&nbsp;
              <Button variant="link" onClick={() => setIsEditingMode(true)}>
                {t("formEditFormPreview2")}
              </Button>
            </div>
          )}
        </form>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{t("formEmptyForm")}</CardTitle>
            <CardDescription>{t("formEmptyFormDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-2">
            <FormInputIcon className="w-12 h-12 text-gray-500" />
            <p className="text-center text-gray-500">
              {t("formEmptyFormDescription2")}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button asChild variant="outline">
              <Link href="/dashboard">{t("formGoBack")}</Link>
            </Button>
            <Button onClick={handleAddQuestion}>{t("formAddQuestion")}</Button>
          </CardFooter>
        </Card>
      )}
      {isEditingMode && questions.length > 0 && (
        <Button type="button" onClick={handleAddQuestion} className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" /> {t("formAddQuestion")}
        </Button>
      )}
    </main>
  );
}
