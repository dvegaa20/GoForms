import { notFound } from "next/navigation";
import { fetchFormById } from "@/../lib/actions/form_actions";
import FormPageHeader from "@/../components/go_form/form/FormPageHeader";
import BlockedUserDialog from "@/../components/go_form/BlockedUser";
import { getUserStatus } from "@/../lib/auth";
import { cookies } from "next/headers";

export default async function FormIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { isBlocked } = await getUserStatus();
  const selectedOption = (await cookies()).get("selectedOption")?.value;

  const form = (await fetchFormById({ id, selectedOption })) as Form[];

  if (!form) {
    notFound();
  }

  return (
    <>
      {isBlocked ? (
        <BlockedUserDialog isBlocked={isBlocked} />
      ) : (
        <>
          <FormPageHeader form={form} />
          <div className="bg-blue-100 dark:bg-gray-900 min-h-screen">
            {children}
          </div>
        </>
      )}
    </>
  );
}
