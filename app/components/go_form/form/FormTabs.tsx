"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/../lib/utils";
import Link from "next/link";

const tabs = [
  { title: "Questions", href: "" },
  { title: "Responses", href: "responses" },
] as const;

export default function FormTabs({
  form,
  responses,
}: {
  form: Form[];
  responses: number;
}) {
  const pathname = usePathname();
  return (
    <Tabs defaultValue="questions">
      <TabsList className="w-full bg-transparent gap-x-4 !p-0 h-full">
        {tabs.map((tab) => {
          const formIdPage = `/dashboard/forms/${form[0].id}`;
          const isActive =
            tab.href === ""
              ? pathname === formIdPage
              : pathname.includes(`${formIdPage}/${tab.href}`);
          return (
            <TabsTrigger
              key={tab.href}
              value={tab.href}
              className={cn(
                `flex-col !p-0`,
                isActive ? "!text-blue-900" : "text-neutral-950"
              )}
              asChild
            >
              <div className="space-y-1.5 w-fit">
                <Link
                  href={`${formIdPage}/${tab.href}`}
                  className="flex items-center font-medium text-sm px-2"
                >
                  {tab.title}
                  {tab.href === "responses" && responses > 0 && (
                    <span className="flex items-center justify-center text-accent rounded-full h-4 w-4 shrink-0 ml-2 text-xs bg-blue-900">
                      {responses}
                    </span>
                  )}
                </Link>
                <hr
                  className={cn(
                    `w-full border-b-2 rounded-t-xl`,
                    isActive ? "border-blue-900" : "border-transparent"
                  )}
                />
              </div>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
