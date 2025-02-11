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
import Link from "next/link";

export default function RecentForms() {
  return (
    <section className="p-4 space-y-4 pt-8">
      <div className="flex justify-between items-center">
        <div className="bg-primary rounded-md px-4 py-1">
          <p className="text-xl text-white font-medium">Your Forms</p>
        </div>
        <div className="flex items-center gap-x-2">
          <Link href="/dashboard/new" passHref>
            <Button size="sm">
              <Plus /> Create New Form
            </Button>
          </Link>
          <Select defaultValue="anyone">
            <SelectTrigger className="w-[200px] border border-gray-200 rounded-md shadow-sm">
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
