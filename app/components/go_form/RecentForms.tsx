"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import FormList from "@/components/go_form/form/FormList";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useFormOrTemplateStore } from "@/../store/store";

export default function RecentForms() {
  const { selectedOption, setSelectedOption } = useFormOrTemplateStore();

  return (
    <section className="p-4 space-y-4 pt-8">
      <div className="flex justify-between items-center">
        <div className="bg-primary rounded-md px-4 py-1">
          <p className="text-xl text-white dark:text-black font-medium">
            Recent Forms
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <Link href="/dashboard/new" passHref>
            <Button size="sm">
              <Plus /> Create New Form
            </Button>
          </Link>
          <Select
            defaultValue={selectedOption}
            onValueChange={setSelectedOption}
          >
            <SelectTrigger className="w-[200px] rounded-md shadow-sm">
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
