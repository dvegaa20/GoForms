"use server";

import { currentUser } from "@clerk/nextjs/server";
import { fetchUserStatus } from "@/../lib/actions/user_actions";

export async function getUserStatus() {
  try {
    const user = await currentUser();
    if (!user) return { isBlocked: false, id: null };

    const status = await fetchUserStatus({ id: user.id });
    return { isBlocked: status?.[0]?.status === "blocked", id: user.id };
  } catch (error) {
    console.error(error);
    return { isBlocked: false, id: null };
  }
}
