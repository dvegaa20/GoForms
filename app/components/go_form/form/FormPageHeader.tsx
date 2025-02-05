import { UserButton } from "@clerk/nextjs";
import { Layers, MoreVertical } from "lucide-react";
import Link from "next/link";
import React from "react";
import SendForm from "./SendForm";
import FormPageHeaderBottom from "./FormPageHeaderBottom";
import { EditingModeMenu } from "./EditingModeMenu";

export default function FormPageHeader({ form }: { form: Form[] }) {
  return (
    <header className="flex flex-col items-start sm:items-center gap-y-4 fixed w-full pt-4 px-4 bg-white shadow z-50">
      <div className="flex items-start w-full sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Link href={"/dashboard"} className="flex items-center space-x-2">
            <Layers className="h-6 w-6 text-primary" />
            <span className="ml-2 text-xl font-bold">GoForms</span>
          </Link>
          <p className="pl-1 sm:pl-4 pr-3">{form[0].title}</p>
        </div>
        <div className="flex items-center sm:gap-x-4">
          <SendForm />
          <EditingModeMenu />
          <UserButton />
        </div>
      </div>
      <FormPageHeaderBottom form={form} />
    </header>
  );
}
