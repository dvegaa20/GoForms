"use client";

import { useParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/../components/ui/tabs";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ResponsesTabs() {
  const params = useParams();
  const responsesPage = `/dashboard/forms/${params?.id}/responses`;
  const t = useTranslations("ResponsesTab");

  return (
    <Tabs defaultValue="summary" className="w-full">
      <TabsList className="w-full bg-transparent gap-x-4 !p-0 h-full justify-evenly">
        <TabsTrigger value="summary" className="flex-col !p-0 text-neutral-950">
          <div className="space-y-1.5 w-fit">
            <Link
              className="font-medium text-sm flex items-center px-2"
              href={responsesPage}
            >
              {t("summary")}
            </Link>
            <hr className="w-full border-b-2 rounded-t-xl border-blue-600" />
          </div>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
