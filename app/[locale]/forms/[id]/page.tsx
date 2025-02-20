import { fetchFormById, getQuestions } from "@/../lib/actions/form_actions";
import { notFound } from "next/navigation";
import MainForm from "@/../components/go_form/form/MainForm";
import { ModeToggle } from "@/../components/ModeToggle";
import { LanguageSwitcher } from "@/../components/LangToggle";

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

  return (
    <div className="p-4">
      <div className="flex justify-end space-x-2 pt-4">
        <LanguageSwitcher />
        <ModeToggle />
      </div>
      <MainForm form={form[0]} formQuestions={formQuestions} publicForm />
    </div>
  );
}
