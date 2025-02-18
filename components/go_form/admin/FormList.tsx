"use client";

import FormItem from "./FormItem";
import NoForms from "../NoForms";

export default function FormList({ forms, onDelete }) {
  return (
    <div className="space-y-4">
      {forms.length === 0 ? (
        <NoForms />
      ) : (
        forms.map((form) => (
          <FormItem key={form.id} form={form} onDelete={onDelete} />
        ))
      )}
    </div>
  );
}
