import BlockedUserDialog from "@/components/go_form/BlockedUser";
import CreateNewFormHeader from "@/components/go_form/form/new/CreateNewFormHeader";
import { getUserStatus } from "@/../lib/auth";

export default async function NewFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isBlocked } = await getUserStatus();

  return (
    <>
      {isBlocked ? (
        <BlockedUserDialog isBlocked={isBlocked} />
      ) : (
        <>
          <CreateNewFormHeader />
          <div className="bg-blue-100 dark:bg-gray-900 min-h-screen">
            {children}
          </div>
        </>
      )}
    </>
  );
}
