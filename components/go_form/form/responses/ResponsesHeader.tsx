import { getResponses } from "@/../lib/actions/form_actions";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/../components/ui/card";
import ResponsesTab from "@/../components/go_form/form/tabs/ResponsesTab";
import { getTranslations } from "next-intl/server";

export default async function ResponsesHeader({ id }: { id: string }) {
  const responses = await getResponses({ id });
  const t = await getTranslations("FormTabs");

  return (
    <Card className="p-4">
      <hr className="w-full border-t-8 rounded-t-xl border-blue-800" />
      <CardHeader>
        <CardTitle className="font-normal">
          {responses?.length}{" "}
          {responses?.length === 1 ? t("response") : t("responses")}
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <ResponsesTab />
      </CardFooter>
    </Card>
  );
}
