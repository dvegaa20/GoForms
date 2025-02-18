import { UserButton } from "@clerk/nextjs";
import { Layers } from "lucide-react";
import Link from "next/link";
import SendForm from "./SendForm";
import FormPageHeaderBottom from "./FormPageHeaderBottom";
import { EditingModeMenu } from "./EditingModeMenu";
import { ModeToggle } from "@/../components/ModeToggle";
import { currentUser } from "@clerk/nextjs/server";
import { fetchUserAdminStatus } from "@/../lib/actions/user_actions";
import { cookies } from "next/headers";

export default async function FormPageHeader({ form }: { form: Form[] }) {
  const user = await currentUser();
  const isAdmin = await fetchUserAdminStatus({ id: user.id });
  const selectedOption = (await cookies()).get("selectedOption")?.value;

  return (
    <header className="flex flex-col items-start sm:items-center gap-y-4 fixed w-full pt-4 px-4 bg-white dark:bg-black shadow z-50">
      <div className="flex items-start w-full sm:items-center justify-between pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Link href={"/dashboard"} className="flex items-center space-x-2">
            <Layers className="h-6 w-6 text-primary" />
            <span className="ml-2 text-xl font-bold">GoForms</span>
          </Link>
          <p className="pl-1 sm:pl-4 pr-3">{form[0].title}</p>
        </div>
        <div className="flex items-center sm:gap-x-4">
          {selectedOption === "me" && (
            <>
              <SendForm />
              <EditingModeMenu />
            </>
          )}
          {selectedOption === "templates" && isAdmin[0].admin && (
            <EditingModeMenu />
          )}
          <UserButton />
          <ModeToggle />
        </div>
      </div>
      {selectedOption === "me" && <FormPageHeaderBottom form={form} />}
      {selectedOption === "templates" && isAdmin[0].admin && (
        <FormPageHeaderBottom form={form} />
      )}
    </header>
  );
}
