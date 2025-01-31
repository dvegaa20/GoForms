"use client";

import React from "react";
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
import { SearchIcon } from "lucide-react";

export default function SearchInput() {
  //   const { close, isOpen, open } = useDialogStore();
  return (
    <div>
      <div className="hidden md:flex flex-1 items-center justify-between w-full lg:w-auto max-w-xl lg:min-w-[270px] py-3 px-4 gap-x-6 rounded-md cursor-pointer bg-gray-100 transition-colors">
        <div className="flex items-center gap-x-2">
          <SearchIcon className="w-6 h-6 text-neutral-500" />
          <p className="text-neutral-500 font-light">Search</p>
        </div>
      </div>
    </div>
  );
}
