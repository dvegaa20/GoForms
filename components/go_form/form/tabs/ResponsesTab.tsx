"use client";

import { useParams, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/../components/ui/tabs";
import { cn } from "@/../lib/utils";
import Link from "next/link";

export default function ResponsesTabs() {
  const pathname = usePathname();
  const params = useParams();
  const responsesPage = `/dashboard/forms/${params.id}/responses`;
  const isActive = pathname === responsesPage;

  return (
    <Tabs defaultValue="questions" className="w-full">
      <TabsList className="w-full bg-transparent gap-x-4 !p-0 h-full justify-evenly">
        <TabsTrigger
          value=""
          className={cn(
            "flex-col !p-0",
            isActive ? "!text-blue-600" : "text-neutral-950"
          )}
          asChild
        >
          <div className="space-y-1.5 w-fit">
            <Link
              className="font-medium text-sm flex items-center px-2"
              href={responsesPage}
            >
              Summary
            </Link>
            <hr
              className={cn(
                "w-full border-b-2 rounded-t-xl",
                isActive ? "border-blue-600" : "border-transparent"
              )}
            />
          </div>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
