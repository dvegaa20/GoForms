"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useActionState, useEffect } from "react";
import { cn } from "@/../lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { attributeTypeToInputType } from "@/../types/types";
import { addFormData } from "@/../lib/actions/actions";
import { FormInputIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import SubmitButton from "./SubmitButton";
import Link from "next/link";

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
  const questions = formQuestions[0].questions;
  const initialState = {
    error: "",
  };
  const [state, formAction] = useActionState(addFormData, initialState);

  useEffect(() => {
    if (state.success) {
      router.push(`/forms/${state.formIdentifier}/success`);
    }
  }, [state, router]);

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
          {form.title}
        </CardTitle>
      </Card>

      {questions.length > 0 ? (
        <form className="space-y-3.5" action={formAction}>
          <input type="hidden" name="identifier" value={form.id} />
          {questions.map((question) => (
            <Card key={question.order}>
              <CardContent className="space-y-2 pt-4">
                <div className="flex justify-between py-2">
                  <Label htmlFor={question.order}>
                    {question.question_title}
                  </Label>
                  <p className="text-[12px] font-medium text-primary">
                    {question.question_description}
                  </p>
                </div>
                {question.options ? (
                  <RadioGroup
                    key={question.order}
                    id={question.order}
                    disabled={!publicForm}
                    name={question.order}
                  >
                    {question.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={option.id}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <Input
                    className="disabled:opacity-100"
                    disabled={!publicForm}
                    type={attributeTypeToInputType[question.question_type]}
                    name={question.order}
                    id={question.order}
                    placeholder="Type your answer here"
                    required={question.required}
                  />
                )}
              </CardContent>
            </Card>
          ))}
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
            <div className="flex items-center justify-center mt-6">
              To make any edits, enter&nbsp;
              <span className="text-blue-800"> edition mode</span>
            </div>
          )}
        </form>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Empty Form</CardTitle>
            <CardDescription>
              This form currently has no fields. Please go to the CMS to add
              fields to this form.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-2">
            <FormInputIcon className="w-12 h-12 text-gray-500" />
            <p className="text-center text-gray-500">
              No fields are available in this form.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button asChild variant="outline">
              <Link href={`/dashboard`}>Go Back</Link>
            </Button>
            <Button asChild>
              <Link href={`/`}>Go to CMS</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </main>
  );
}
