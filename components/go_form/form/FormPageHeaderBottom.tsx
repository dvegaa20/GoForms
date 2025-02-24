import { getResponses } from "@/../lib/actions/form_actions";
import FormTabs from "./FormTabs";

export default async function FormPageHeaderBottom({ form }: { form: Form[] }) {
  const responses = await getResponses({ id: form[0].id });

  return <FormTabs form={form} responses={responses?.length || 0} />;
}
