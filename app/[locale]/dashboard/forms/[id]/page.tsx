import { fetchFormById, getQuestions } from "@/../lib/actions/form_actions";
import { notFound } from "next/navigation";
import MainForm from "@/../components/go_form/form/MainForm";
import { cookies } from "next/headers";
export default async function FormIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const selectedOption = (await cookies()).get("selectedOption")?.value;
  const form = (await fetchFormById({ id, selectedOption })) as Form[];
  const formQuestions = (await getQuestions({
    id,
    selectedOption,
  })) as Question[];

  if (!form) {
    notFound();
  }

  return (
    <div className="p-4">
      <MainForm form={form[0]} formQuestions={formQuestions} />
    </div>
  );
}
