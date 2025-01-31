import Header from "@/components/go_form/Header";
import RecentForms from "@/components/go_form/RecentForms";
import React from "react";

export default function DashboardPage() {
  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto ">
        <RecentForms />
      </main>
    </div>
  );
}
