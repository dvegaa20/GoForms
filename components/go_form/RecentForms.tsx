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
import { useTranslations } from "next-intl";

export default function RecentForms() {
  const { selectedOption, setSelectedOption } = useFormOrTemplateStore();
  useSyncStoreWithCookie();
  const t = useTranslations("RecentForms");
  return (
    <section className="p-4 space-y-4 pt-8">
      <div className="flex justify-between items-center">
        <div className="bg-primary rounded-md px-1 py-1 sm:px-4 sm:py-1 ">
          <p className="text-lg sm:text-xl text-nowrap text-white dark:text-black font-medium">
            {t("title")}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Link href="/dashboard/new" passHref>
            <Button size="sm" className="whitespace-nowrap px-3">
              <Plus className="h-4 w-4 mr-1" /> {t("createNewForm")}
            </Button>
          </Link>
          <Select
            defaultValue={selectedOption}
            onValueChange={setSelectedOption}
          >
            <SelectTrigger className="w-[180px] rounded-md shadow-sm">
              <SelectValue placeholder={t("selectOption1")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="me" className="cursor-pointer">
                {t("selectOption1")}
              </SelectItem>
              <SelectItem value="templates" className="cursor-pointer">
                {t("selectOption2")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <FormList />
    </section>
  );
}
