import { getUserStatus } from "@/../lib/auth";
import BlockedUserDialog from "@/../components/go_form/BlockedUser";

export default async function ResponsesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isBlocked } = await getUserStatus();

  return (
    <div className="max-w-3xl mx-auto pt-40 sm:pt-32 pb-16 space-y-3.5">
      {isBlocked ? (
        <BlockedUserDialog isBlocked={isBlocked} />
      ) : (
        <>{children}</>
      )}
    </div>
  );
}
