import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/../components/ui/card";
import { fetchFormById } from "@/../lib/actions/form_actions";
import Link from "next/link";
import { notFound } from "next/navigation";
export default async function FormSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const form = (await fetchFormById({ id, selectedOption: "me" })) as Form[];

  if (!form) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto pb-16 pt-8 space-y-3.5">
      <Card>
        <hr className="w-full border-t-8 rounded-t-xl border-blue-800" />
        <CardHeader className="space-y-4">
          <CardTitle className="text-3xl font-medium">
            {form[0].title}
          </CardTitle>

          <CardDescription>Your response has been recorded.</CardDescription>

          <Link
            className="text-blue-600 underline text-sm"
            replace
            href={`/forms/${form[0].id}`}
          >
            Submit another response
          </Link>
        </CardHeader>
      </Card>
    </main>
  );
}
