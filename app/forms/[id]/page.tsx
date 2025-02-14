import { fetchFormById, getQuestions } from "../../../lib/actions/form_actions";
import { notFound } from "next/navigation";
import MainForm from "@/components/go_form/form/MainForm";
import { cookies } from "next/headers";
export default async function PublicFormIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const form = (await fetchFormById({ id, selectedOption: "me" })) as Form[];
  const formQuestions = (await getQuestions({
    id,
    selectedOption: "me",
  })) as Question[];

  if (!form) {
    notFound();
  }

  return <MainForm form={form[0]} formQuestions={formQuestions} publicForm />;
}
