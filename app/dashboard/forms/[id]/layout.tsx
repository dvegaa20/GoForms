import { notFound } from "next/navigation";
import { fetchFormById, fetchUserStatus } from "@/../lib/actions";
import { currentUser } from "@clerk/nextjs/server";
import FormPageHeader from "@/components/go_form/form/FormPageHeader";
import BlockedUserDialog from "@/components/go_form/BlockedUser";

export default async function FormIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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

  const form = (await fetchFormById({ id })) as Form[];

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
          <div className="bg-blue-100 min-h-screen">{children}</div>
        </>
      )}
    </>
  );
}
