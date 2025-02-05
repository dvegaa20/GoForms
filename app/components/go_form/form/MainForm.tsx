import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { cn } from "@/../lib/utils";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FormInputIcon } from "lucide-react";

export default function MainForm({
  form,
  formQuestions,
  publicForm,
}: {
  form: Form;
  formQuestions: any;
  publicForm?: boolean;
}) {
  const questions = formQuestions[0].questions;
  return (
    <main
      className={cn(
        "max-w-3xl mx-auto pb-16 space-y-3.5",
        !publicForm ? "pt-40 sm:pt-32" : "pt-8"
      )}
    >
      <Card>
        <hr className="w-full border-t-8 rounded-t-xl border-violet-800" />
        <CardHeader className="p-0 space-y-0" />
        <CardTitle className="text-3xl font-medium px-6 py-5">
          {form.title}
        </CardTitle>
      </Card>

      {questions.length > 0 ? (
        <form className="space-y-3.5">
          <input type="hidden" name="identifier" value={form.id} />
          {questions.map((question) => (
            <Card key={question.order}>
              <CardContent className="space-y-2 pt-4">
                <Label htmlFor={question.order}>
                  {question.question_title}
                </Label>
                {question.options ? (
                  <RadioGroup
                    key={question.order}
                    id={question.order}
                    disabled={!publicForm}
                    name={question.order}
                  >
                    {question.options.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem value={option || ""} id={option.id} />
                        <Label htmlFor={option.id}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <Input
                    className="disabled:opacity-100"
                    disabled={!publicForm}
                    name={question.order}
                    id={question.order}
                    placeholder="Type your answer here"
                  />
                )}
              </CardContent>
            </Card>
          ))}
          {publicForm ? (
            <div className="flex flex-col space-y-2 w-full">
              <div className="flex items-center justify-between">
                {/* <SubmitButton /> */}
                <Button
                  type="button"
                  className="hover:bg-violet-200/50 text-purple-800 hover:text-purple-800"
                >
                  Clear form
                </Button>
              </div>
              {/*  */}
            </div>
          ) : (
            <div className="flex items-center justify-center mt-6">
              To make any edits, enter&nbsp;
              <span className="text-purple-800"> edition mode</span>
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
