import ResponsesHeader from "@/components/go_form/form/responses/ResponsesHeader";
import { getUserStatus } from "@/../lib/auth";
import BlockedUserDialog from "@/components/go_form/BlockedUser";

export default async function ResponsesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { isBlocked } = await getUserStatus();

  return (
    <div className="max-w-3xl mx-auto pt-40 sm:pt-32 pb-16 space-y-3.5">
      {isBlocked ? (
        <BlockedUserDialog isBlocked={isBlocked} />
      ) : (
        <>
          <ResponsesHeader id={id} />
          {children}
        </>
      )}
    </div>
  );
}
