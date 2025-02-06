import ResponsesHeader from "@/components/go_form/form/ResponsesHeader";
import React from "react";

export default async function ResponsesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="max-w-3xl mx-auto pt-40 sm:pt-32 pb-16 space-y-3.5">
      <ResponsesHeader id={id} />
      {children}
    </div>
  );
}
