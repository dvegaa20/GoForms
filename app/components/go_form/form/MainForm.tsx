"use client";

import { useEffect, useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import { Reorder } from "framer-motion";
import {
  Copy,
  GripVertical,
  MoreVertical,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/../lib/utils";
import { attributeTypeToInputType } from "@/../types/types";
import {
  addFormData,
  createForm,
  updateFormData,
} from "@/../lib/actions/form_actions";
import { useEditingMode, useFormOrTemplateStore } from "@/../store/store";
import SubmitButton from "./SubmitButton";
import { toast } from "sonner";
import { Separator } from "@radix-ui/react-select";

export default function MainForm({
  form,
  formQuestions,
  publicForm,
}: {
  form: Form;
  formQuestions: any;
  publicForm?: boolean;
}) {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>(
    formQuestions[0].questions
  );
  const [title, setTitle] = useState(form.title);
  const initialState = { error: "" };
  const [state, formAction] = useActionState(addFormData, initialState);
  const { isEditingMode, setEditingMode } = useEditingMode();
  const { selectedOption } = useFormOrTemplateStore();

  useEffect(() => {
    if (state.success) {
      router.push(`/forms/${state.formIdentifier}/success`);
    }
  }, [state, router]);

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
              options: value === "multiple-choice" ? [""] : undefined,
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
        question_title: "New Question",
        question_description: "",
      },
    ]);
  };

  const handleRemoveQuestion = (order: number) => {
    setQuestions(questions.filter((q) => q.order !== order));
  };

  const handleSubmitUpdate = async () => {
    const formData = new FormData();
    formData.append(
      `${selectedOption === "me" ? "form_id" : "template_id"}`,
      form.id
    );
    formData.append("title", title);
    formData.append("description", form.description);
    formData.append("topic", form.topic);
    formData.append("questions", JSON.stringify(questions));

    await updateFormData(null, formData);

    setEditingMode(false);

    toast.success("Form updated successfully");
  };

  const handleCopyTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newTitle = `${title} (Copy)`;
      const formData = new FormData();
      formData.append("title", newTitle);
      formData.append("description", form.description);
      formData.append("topic", form.topic);
      formData.append("questions", JSON.stringify(questions));

      const result = await createForm(
        newTitle,
        form.description,
        form.topic,
        questions
      );

      if (result?.error) {
        toast.error(result.error);
      } else {
        router.push(`/dashboard`);
        toast.success("Template cloned successfully");
      }
    } catch (error) {
      toast.error("Failed to clone template");
    }
  };

  return (
    <main
      className={cn(
        "max-w-3xl mx-auto pb-16 space-y-3.5",
        !publicForm ? "pt-40 sm:pt-32" : "pt-8"
      )}
    >
      <Card>
        <hr className="w-full border-t-8 rounded-t-xl border-blue-800" />
        <CardHeader className="p-0 space-y-0" />
        <CardTitle className="text-3xl font-medium px-6 py-5">
          {isEditingMode ? (
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
          ) : (
            title
          )}
        </CardTitle>
      </Card>

      {questions.length > 0 && (
        <form className="space-y-3.5" action={formAction}>
          <input type="hidden" name="identifier" value={form.id} />
          <Reorder.Group values={questions} onReorder={setQuestions}>
            {questions.map((question) => (
              <Reorder.Item key={question.order} value={question}>
                <Card className="my-3">
                  <CardContent className="space-y-2 pt-4">
                    {isEditingMode ? (
                      <div className="flex items-center space-x-2">
                        <Input
                          type="text"
                          value={question.question_title}
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
                              value
                            )
                          }
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select question type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="integer">Integer</SelectItem>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="radio">Options</SelectItem>
                            <SelectItem value="number">Decimal</SelectItem>
                            <SelectItem value="boolean">Yes/No</SelectItem>
                            <SelectItem value="file">File</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveQuestion(question.order)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove question</span>
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
                        disabled={!publicForm}
                        name={question.order.toString()}
                      >
                        {question.options?.map((option, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={option}
                              id={`${question.order}-option-${index}`}
                            />
                            {isEditingMode ? (
                              <div className="flex items-center space-x-2 flex-1">
                                <Input
                                  type="text"
                                  value={option}
                                  onChange={(e) =>
                                    handleOptionChange(
                                      question.order,
                                      index,
                                      e.target.value
                                    )
                                  }
                                  className="border px-2 py-1 rounded w-full"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() =>
                                    handleRemoveOption(question.order, index)
                                  }
                                  disabled={question.options?.length === 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <Label
                                htmlFor={`${question.order}-option-${index}`}
                              >
                                {option}
                              </Label>
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
                            Add Option
                          </Button>
                        )}
                      </RadioGroup>
                    ) : (
                      <Input
                        className="disabled:opacity-100"
                        disabled={!publicForm}
                        type={attributeTypeToInputType[question.question_type]}
                        name={question.order.toString()}
                        id={question.order.toString()}
                        placeholder="Type your answer here"
                        required={question.required}
                      />
                    )}
                  </CardContent>
                </Card>
              </Reorder.Item>
            ))}
          </Reorder.Group>
          {publicForm ? (
            <div className="flex flex-col space-y-2 w-full">
              <div className="flex items-center justify-between">
                <SubmitButton />
                <Button type="button" variant="ghost">
                  Clear form
                </Button>
              </div>
              <p className="text-destructive ml-auto">{state?.error}</p>
            </div>
          ) : (
            <div>
              {!isEditingMode ? (
                <div className="mt-6 space-y-4">
                  <div className="flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <Button variant="outline" size="sm" disabled>
                      Enter Edition Mode{" "}
                      <MoreVertical className="w-4 h-4 ml-2" />
                    </Button>
                    <div className="hidden sm:block">
                      <Separator className="h-6" />
                    </div>
                    <div className="sm:hidden">
                      <Separator className="w-1/2 mx-auto" />
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleCopyTemplate}
                      disabled={state?.pending}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {state?.pending ? "Cloning..." : "Clone This Form"}
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground text-center max-w-lg mx-auto">
                    Disclaimer: You can only make direct changes if you are an
                    admin. Toggle edition mode in the top right corner to make
                    changes.
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between mt-6">
                  <Button
                    type="button"
                    onClick={handleAddQuestion}
                    size="sm"
                    className="flex items-center"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Question
                  </Button>
                  <div className="space-x-2">
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleSubmitUpdate}
                    >
                      Save Changes
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditingMode(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </form>
      )}
    </main>
  );
}
