"use client";

import { MoreVertical } from "lucide-react";
import { Switch } from "@/../components/ui/switch";
import { Button } from "@/../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/../components/ui/dropdown-menu";
import { useEditingMode } from "@/../store/store";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
export function EditingModeMenu() {
  const { isEditingMode, toggleEditingMode } = useEditingMode();
  const [hasMounted, setHasMounted] = useState(false);
  const t = useTranslations("EditingModeMenu");
  useEffect(() => {
    if (hasMounted) {
      toast.warning(
        `Edition mode is ${isEditingMode ? "enabled" : "disabled"}`
      );
    } else {
      setHasMounted(true);
    }
  }, [isEditingMode, hasMounted]);

  const handleSwitchClick = (event: React.PointerEvent) => {
    event.preventDefault();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-2">
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
          }}
          className="flex items-center justify-between"
        >
          <span>{t("editionMode")}</span>
          <Switch
            checked={isEditingMode}
            onCheckedChange={toggleEditingMode}
            aria-label="Toggle edition mode"
            onPointerDown={handleSwitchClick}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
