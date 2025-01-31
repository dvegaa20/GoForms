import Link from "next/link";
import React from "react";
import { Layers } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Search from "./Search";

export default function Header() {
  return (
    <header className="flex justify-between sticky top-0 gap-x-4 px-4 py-2 bg-white z-50 max-w-screen-2xl mx-auto">
      <div className="flex items-center space-x-2">
        <Link href={"/"} className="flex items-center space-x-2">
          <Layers className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold">GoForms</span>
        </Link>
      </div>
      <Search />
      <UserButton />
    </header>
  );
}
