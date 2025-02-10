"use client";

import { useParams } from "next/navigation";
import { TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function LinkTabContent() {
  const params = useParams();
  const id = params.id;
  const url = `${window.location.origin}/forms/${id}`;
  return (
    <TabsContent value="link" className="px-4 py-4 space-y-3">
      <div className="grid w-full items-center gap-3">
        <Label htmlFor="link" className="text-base">
          Link
        </Label>
        <Input type="url" id="link" value={url} readOnly />
      </div>
      <div className="flex items-end justify-end space-x-2">
        <DialogClose asChild>
          <Button size="sm">Cancel</Button>
        </DialogClose>
        <Button
          size="sm"
          onClick={() => {
            navigator.clipboard.writeText(url);
            toast.success("Link copied to clipboard");
          }}
        >
          Copy link
        </Button>
      </div>
    </TabsContent>
  );
}
