import FormCard from "./FormCard";
import { useForms } from "@/../hooks/useForm";
import NoForms from "../NoForms";
export default function FormList() {
  const { forms } = useForms();

  return (
    <>
      {forms.length === 0 && <NoForms />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
        {forms.map((form) => (
          <FormCard key={form.id} form={form} />
        ))}
      </div>
    </>
  );
}
