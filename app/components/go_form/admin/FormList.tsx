"use client";

import FormItem from "./FormItem";

export default function FormList({ forms, onDelete }) {
  return (
    <div className="space-y-4">
      {forms.length === 0 ? (
        <p className="text-center text-gray-500">No forms found.</p>
      ) : (
        forms.map((form) => (
          <FormItem key={form.id} form={form} onDelete={onDelete} />
        ))
      )}
    </div>
  );
}
