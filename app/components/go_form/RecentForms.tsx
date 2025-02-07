import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import FormList from "@/components/go_form/form/FormList";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function RecentForms() {
  return (
    <section className="p-4 space-y-4 pt-8">
      <div className="flex justify-between items-center">
        <div className="bg-primary rounded-md px-4">
          <p className="text-xl text-white font-medium">Your Forms</p>
        </div>
        <div className="flex items-center gap-x-2">
          <Button size="sm">
            <Plus /> Create New Form
          </Button>
          <Select defaultValue="anyone">
            <SelectTrigger className="w-[200px] bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <SelectValue placeholder="Owned by anyone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="anyone" className="cursor-pointer">
                All Forms
              </SelectItem>
              <SelectItem value="me" className="cursor-pointer">
                Owned by me
              </SelectItem>
              <SelectItem value="templates" className="cursor-pointer">
                Go Forms Templates
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <FormList />
    </section>
  );
}
