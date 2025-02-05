"use client";

import React, { useCallback, useEffect } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { SearchIcon, Command as LucideCommand, ChevronUp } from "lucide-react";
import { useDialogStore } from "@/../store/store";
import { useRouter } from "next/navigation";
import { DialogTitle } from "@/components/ui/dialog";

export default function SearchInput({ forms }: { forms: Form[] }) {
  const router = useRouter();
  const { close, isOpen, open } = useDialogStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        open();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  const runCommand = useCallback(
    (command: () => unknown) => {
      close();
      command();
    },
    [close]
  );

  return (
    <>
      <div
        onClick={open}
        className="hidden md:flex flex-1 items-center justify-between w-full lg:w-[800px] max-w-xl py-3 px-4 gap-x-6 rounded-md cursor-pointer bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-x-2">
          <SearchIcon className="w-4 h-4 text-neutral-500" />
          <p className="text-neutral-500 font-light flex items-center text-sm">
            Search or Press <LucideCommand className="w-4 h-4 mx-1" />k or
            <ChevronUp className="w-4 h-4 mx-1" /> k
          </p>
        </div>
      </div>
      <CommandDialog open={isOpen} onOpenChange={close}>
        <DialogTitle></DialogTitle>
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {forms.map((form) => (
              <CommandItem
                key={form.id}
                onSelect={() =>
                  runCommand(() => router.push(`/dashboard/${form.id}`))
                }
              >
                {form.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
