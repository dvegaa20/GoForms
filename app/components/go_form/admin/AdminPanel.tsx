"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  fetchUsers,
  toggleBlockUser,
  toggleAdminUser,
  removeUser,
} from "@/../lib/actions/user_actions";
import UserList from "@/components/go_form/admin/UserList";
import FormList from "@/components/go_form/admin/FormList";
import { useForms } from "@/../hooks/useForm";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);

  const forms = useForms();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        const formattedUsers = usersData.map((user) => ({
          ...user,
          isBlocked: user.status === "blocked",
          isAdmin: user.admin === true,
        }));
        setUsers(formattedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    loadUsers();
  }, []);

  const handleToggleBlock = async (userId) => {
    try {
      await toggleBlockUser(userId);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user
        )
      );
    } catch (error) {
      console.error("Error toggling block status:", error);
    }
  };

  const handleToggleAdmin = async (userId) => {
    try {
      await toggleAdminUser(userId);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user
        )
      );
    } catch (error) {
      console.error("Error toggling admin status:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await removeUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Menu className="text-primary" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Admin Panel</SheetTitle>
          <SheetDescription>
            Manage quickly any users and forms.
          </SheetDescription>
        </SheetHeader>
        <Tabs defaultValue="users" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="pt-2">
            <UserList
              users={users}
              onToggleBlock={handleToggleBlock}
              onToggleAdmin={handleToggleAdmin}
              onDelete={handleDeleteUser}
            />
          </TabsContent>
          <TabsContent value="forms" className="pt-2">
            <FormList forms={forms} onDelete={handleDeleteUser} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
