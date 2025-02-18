"use client";

import UserItem from "./UserItem";

export default function UserList({
  users,
  onToggleBlock,
  onToggleAdmin,
  onDelete,
}) {
  return (
    <div className="space-y-4">
      {users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          onToggleBlock={onToggleBlock}
          onToggleAdmin={onToggleAdmin}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
