import { useEffect, useState } from "react";
import { fetchForms } from "@/../lib/actions/form_actions";
import { useFormOrTemplateStore } from "@/../store/store";

export function useForms() {
  const { selectedOption } = useFormOrTemplateStore();
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchForms({ selectedOption });
      if (data) setForms(data as Form[]);
    };

    fetchData();
  }, [selectedOption]);

  return forms;
}
