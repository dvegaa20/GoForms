import React from "react";

export default function FormIdLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return <div className="bg-blue-100 min-h-screen px-6">{children}</div>;
}
