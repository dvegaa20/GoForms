import React from "react";
import { fetchFormById, getQuestions } from "@/../lib/actions/actions";
import { notFound } from "next/navigation";
import MainForm from "@/components/go_form/form/MainForm";

export default async function PublicFormIdPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const form = (await fetchFormById({ id })) as Form[];
  const formQuestions = (await getQuestions({ id })) as Question[];

  if (!form) {
    notFound();
  }

  return <MainForm form={form[0]} formQuestions={formQuestions} publicForm />;
}
