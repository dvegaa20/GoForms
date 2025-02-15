import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export default function DeleteDialog({
  user,
  form,
  onDelete,
}: {
  user?: any;
  form?: any;
  onDelete: any;
}) {
  const [open, setOpen] = useState(false);

  const handleConfirmDelete = () => {
    onDelete(user ? user.id : form.id);
    toast.success(
      `${user ? `${user.first_name} ${user.last_name}` : form.title} has been deleted`
    );
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Button size="icon" variant="outline" onClick={() => setOpen(true)}>
        <Trash className="text-red-500 h-4 w-4" />
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <strong>
              {user ? `${user.first_name} ${user.last_name}` : form.title}
            </strong>
            .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
