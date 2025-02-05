"use client";

import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

export default function BlockedUserDialog({ isBlocked }) {
  const [open, setOpen] = useState(isBlocked);
  const router = useRouter();

  useEffect(() => {
    if (isBlocked) {
      setOpen(true);
    }
  }, [isBlocked]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Restriced Access</AlertDialogTitle>
          <AlertDialogDescription>
            Your account has been blocked. Please contact your administrator for
            more information.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setOpen(false);
              router.push("/");
            }}
          >
            Redirect to Home
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
