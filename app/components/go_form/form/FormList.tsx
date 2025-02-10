import { fetchAllForms } from "@/../lib/actions";
import FormCard from "./FormCard";

export default async function FormList() {
  const forms = (await fetchAllForms()) as Form[];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </div>
  );
}
