"use client";

import { Lock, Unlock, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import DeleteDialog from "./DeleteDialog";

export default function UserItem({
  user,
  onToggleBlock,
  onToggleAdmin,
  onDelete,
}) {
  return (
    <div className="flex items-center justify-between p-2 border rounded">
      <span className="truncate flex-1 max-w-[160px]">{`${user.first_name} ${user.last_name}`}</span>
      <div className="space-x-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            onToggleBlock(user.id);
            toast.success(
              `${user.first_name} ${user.last_name} has been ${user.isBlocked ? "unblocked" : "blocked"}`
            );
          }}
        >
          {user.isBlocked ? (
            <Lock className="h-4 w-4 text-red-500" />
          ) : (
            <Unlock className="h-4 w-4 text-green-500" />
          )}
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            onToggleAdmin(user.id);
            toast.success(
              `${user.first_name} ${user.last_name} has been ${
                user.isAdmin ? "demoted from admin" : "promoted to admin"
              }`
            );
          }}
        >
          <UserCog
            className={`h-4 w-4 ${user.isAdmin ? "text-green-500" : "text-red-500"}`}
          />
        </Button>

        <DeleteDialog user={user} onDelete={onDelete} />
      </div>
    </div>
  );
}
