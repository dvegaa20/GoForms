import React from "react";
import { fetchUserStatus } from "@/../lib/actions/actions";
import { currentUser } from "@clerk/nextjs/server";
import BlockedUserDialog from "@/components/go_form/BlockedUser";
import CreateNewFormHeader from "@/components/go_form/form/new/CreateNewFormHeader";

export default async function NewFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { emailAddresses } = await currentUser();

  let isBlocked = false;

  try {
    const status = await fetchUserStatus({
      email: emailAddresses[0].emailAddress,
    });

    if (status[0].status === "blocked") {
      isBlocked = true;
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      {isBlocked ? (
        <BlockedUserDialog isBlocked={isBlocked} />
      ) : (
        <>
          <CreateNewFormHeader />
          <div className="bg-blue-100 min-h-screen">{children}</div>
        </>
      )}
    </>
  );
}
