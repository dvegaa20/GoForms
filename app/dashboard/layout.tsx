import BlockedUserDialog from "@/components/go_form/BlockedUser";
import { getUserStatus } from "@/../lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isBlocked } = await getUserStatus();

  return (
    <div className="bg-blue-100 dark:bg-gray-900 min-h-screen">
      {isBlocked ? <BlockedUserDialog isBlocked={isBlocked} /> : children}
    </div>
  );
}
