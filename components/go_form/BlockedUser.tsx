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
} from "@/../components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function BlockedUserDialog({ isBlocked }) {
  const [open, setOpen] = useState(isBlocked);
  const router = useRouter();
  const t = useTranslations("BlockedUser");

  useEffect(() => {
    if (isBlocked) {
      setOpen(true);
    }
  }, [isBlocked]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("description")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setOpen(false);
              router.push("/");
            }}
          >
            {t("redirect")}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
