import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-violet-100 min-h-screen">{children}</div>;
}
