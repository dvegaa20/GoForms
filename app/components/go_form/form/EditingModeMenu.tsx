"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function EditingModeMenu() {
  const [isEditingMode, setIsEditingMode] = useState(false);

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
          <span>Edition Mode</span>
          <Switch
            checked={isEditingMode}
            onCheckedChange={setIsEditingMode}
            aria-label="Toggle edition mode"
            onPointerDown={handleSwitchClick}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
