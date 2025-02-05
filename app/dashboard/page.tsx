import Header from "@/components/go_form/Header";
import RecentForms from "@/components/go_form/RecentForms";
import { currentUser } from "@clerk/nextjs/server";
import { postUserData } from "../../lib/actions/actions";
import React from "react";

export default async function DashboardPage() {
  const { id, firstName, lastName, emailAddresses } = await currentUser();

  await postUserData({
    id,
    firstName,
    lastName,
    email: emailAddresses[0].emailAddress,
  });

  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto ">
        <RecentForms />
      </main>
    </div>
  );
}
