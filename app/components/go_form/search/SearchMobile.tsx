"use client";

import { SearchIcon } from "lucide-react";
import { useDialogStore } from "@/../store/store";

export default function SearchMobile() {
  const { open } = useDialogStore();
  return (
    <button onClick={open}>
      <SearchIcon size={22} className="md:hidden text-neutral-500" />
    </button>
  );
}
