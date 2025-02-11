import { getResponses } from "@/../lib/actions/form_actions";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ResponsesTab from "@/components/go_form/form/tabs/ResponsesTab";

export default async function ResponsesHeader({ id }: { id: string }) {
  const responses = await getResponses({ id });
  return (
    <Card>
      <hr className="w-full border-t-8 rounded-t-xl border-blue-800" />
      <CardHeader>
        <CardTitle className="font-normal">
          {responses.length} {responses.length === 1 ? "Response" : "Responses"}
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <ResponsesTab />
      </CardFooter>
    </Card>
  );
}
