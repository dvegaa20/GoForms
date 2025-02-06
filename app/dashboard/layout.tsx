import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { fetchUserStatus } from "../../lib/actions/actions";
import BlockedUserDialog from "@/components/go_form/BlockedUser";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = await currentUser();

  let isBlocked = false;

  try {
    const status = await fetchUserStatus({ id });

    if (status[0].status === "blocked") {
      isBlocked = true;
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="bg-violet-100 min-h-screen">
      {isBlocked ? <BlockedUserDialog isBlocked={isBlocked} /> : children}
    </div>
  );
}
