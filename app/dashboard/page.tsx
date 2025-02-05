import Header from "@/components/go_form/Header";
import RecentForms from "@/components/go_form/RecentForms";
import { currentUser } from "@clerk/nextjs/server";
import { fetchUserStatus, postUserData } from "../../lib/actions/actions";
import BlockedUserDialog from "@/components/go_form/BlockedUser";
import React from "react";

export default async function DashboardPage() {
  const { id, firstName, lastName, emailAddresses } = await currentUser();

  let isBlocked = false;

  try {
    const status = await fetchUserStatus({ id });

    if (status[0].status === "blocked") {
      isBlocked = true;
    } else {
      await postUserData({
        id,
        firstName,
        lastName,
        email: emailAddresses[0].emailAddress,
      });
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto ">
        {isBlocked ? (
          <BlockedUserDialog isBlocked={isBlocked} />
        ) : (
          <RecentForms />
        )}
      </main>
    </div>
  );
}
