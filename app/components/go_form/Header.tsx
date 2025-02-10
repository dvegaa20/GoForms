import Link from "next/link";
import { Layers } from "lucide-react";
import Search from "./search/Search";
import AdminPanel from "./admin/AdminPanel";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { fetchUserAdminStatus } from "@/../lib/actions/actions";

export default async function Header() {
  const user = await currentUser();
  const isAdmin = await fetchUserAdminStatus({ id: user.id });

  return (
    <header className="flex justify-between items-center sticky top-0 gap-x-4 px-4 py-2 bg-white z-50 max-w-screen-2xl mx-auto shadow">
      <div className="flex items-center space-x-2">
        <Link href={"/"} className="flex items-center space-x-2">
          <Layers className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold">GoForms</span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Search />
        {isAdmin[0].admin && <AdminPanel />}
        <UserButton />
      </div>
    </header>
  );
}
