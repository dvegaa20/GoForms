import React from "react";
import { notFound } from "next/navigation";
import { fetchFormById } from "@/../lib/actions/actions";
import FormPageHeader from "@/components/go_form/form/FormPageHeader";

export default async function FormIdLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const form = (await fetchFormById({ id })) as Form[];

  if (!form) {
    notFound();
  }

  return (
    <>
      <FormPageHeader form={form} />
      <div className="bg-violet-100 min-h-screen">{children}</div>
    </>
  );
}
