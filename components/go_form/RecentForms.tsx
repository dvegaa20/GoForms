"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import FormList from "@/../components/go_form/form/FormList";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useFormOrTemplateStore } from "@/../store/store";
import { useSyncStoreWithCookie } from "@/../hooks/useSyncStore-Cookie";

export default function RecentForms() {
  const { selectedOption, setSelectedOption } = useFormOrTemplateStore();
  useSyncStoreWithCookie();

  return (
    <section className="p-4 space-y-4 pt-8">
      <div className="flex justify-between items-center">
        <div className="bg-primary rounded-md px-1 py-1 sm:px-4 sm:py-1 ">
          <p className="text-lg sm:text-xl text-nowrap text-white dark:text-black font-medium">
            Recent Forms
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Link href="/dashboard/new" passHref>
            <Button size="sm" className="w-[180px]">
              <Plus /> Create New Form
            </Button>
          </Link>
          <Select
            defaultValue={selectedOption}
            onValueChange={setSelectedOption}
          >
            <SelectTrigger className="w-[180px] rounded-md shadow-sm">
              <SelectValue placeholder="Owned by anyone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="me" className="cursor-pointer">
                Owned by me
              </SelectItem>
              <SelectItem value="templates" className="cursor-pointer">
                Go Forms Templates
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <FormList />
    </section>
  );
}
