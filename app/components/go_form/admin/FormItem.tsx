"use client";

import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteDialog from "./DeleteDialog";

export default function FormItem({ form, onDelete }) {
  return (
    <div className="flex items-center justify-between p-2 border rounded">
      <span>{form.title}</span>
      <div className="space-x-2">
        <Button size="icon" variant="outline">
          <Link href={`/forms/${form.id}`}>
            <Edit className="text-primary h-4 w-4" />
          </Link>
        </Button>
        <DeleteDialog form={form} onDelete={onDelete} />
      </div>
    </div>
  );
}
