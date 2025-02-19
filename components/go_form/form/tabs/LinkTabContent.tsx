"use client";

import { useParams } from "next/navigation";
import { TabsContent } from "@/../components/ui/tabs";
import { Label } from "@/../components/ui/label";
import { Input } from "@/../components/ui/input";
import { DialogClose } from "@/../components/ui/dialog";
import { Button } from "@/../components/ui/button";
import { toast } from "sonner";
import { Clipboard } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LinkTabContent() {
  const params = useParams();
  const id = params?.id;
  const url = `${window.location.origin}/forms/${id}`;
  const t = useTranslations("SendForm");

  return (
    <TabsContent value="link" className="px-4 py-4 space-y-3">
      <div className="grid w-full items-center gap-3">
        <Label htmlFor="link" className="text-base">
          Link
        </Label>
        <Input type="url" id="link" value={url} readOnly />
      </div>
      <div className="flex items-end justify-end space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            navigator.clipboard.writeText(url);
            toast.success("Link copied to clipboard");
          }}
        >
          <Clipboard className="w-4 h-4" />
          {t("link")}
        </Button>
        <DialogClose asChild>
          <Button size="sm">{t("cancel")}</Button>
        </DialogClose>
      </div>
    </TabsContent>
  );
}
