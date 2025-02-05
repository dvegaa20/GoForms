import React from "react";
import { fetchAllFormsData, getRespones } from "@/../lib/actions/actions";
import FormTabs from "./FormTabs";

export default async function FormPageHeaderBottom({ form }: { form: Form[] }) {
  const formsData = await fetchAllFormsData({ id: form[0].id });
  const responses = await getRespones({ id: form[0].id });

  return <FormTabs form={form} responses={responses.length} />;
}
