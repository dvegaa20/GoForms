import Link from "next/link";
import { Layers } from "lucide-react";
import Search from "./search/Search";
import AdminPanel from "./admin/AdminPanel";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { fetchUserAdminStatus } from "@/../lib/actions/user_actions";
import { ModeToggle } from "../ModeToggle";
import { LanguageSwitcher } from "../LangToggle";

export default async function Header() {
  const user = await currentUser();
  const isAdmin = await fetchUserAdminStatus({ id: user?.id });

  return (
    <header className="flex justify-between items-center sticky top-0 gap-x-4 py-2 bg-white z-50 w-full mx-auto shadow dark:bg-black">
      <div className="flex items-center space-x-2 mx-3">
        <Link href={"/"} className="flex items-center space-x-2">
          <Layers className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold">GoForms</span>
        </Link>
      </div>
      <div className="flex items-center space-x-4 mx-3">
        <Search />
        <div className="flex justify-end space-x-2">
          <LanguageSwitcher />
          <ModeToggle />
        </div>
        <UserButton />
        {isAdmin?.[0]?.admin && <AdminPanel />}
      </div>
    </header>
  );
}
