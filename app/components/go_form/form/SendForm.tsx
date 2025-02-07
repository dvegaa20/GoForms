"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link2, Send, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LinkTabContent from "./tabs/LinkTabContent";
import QrTabContent from "./tabs/QrTabContent";

const tabs = [
  { value: "link", icon: Link2 },
  { value: "qr", icon: QrCode },
];

export default function SendForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Send className="md:hidden w-5 h-5" />
          <Button size="sm" className="px-6 hidden md:inline">
            Send
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader>
          <DialogTitle className="font-normal text-2xl px-4 py-3">
            Send form
          </DialogTitle>
          <DialogDescription className="bg-gray-100 text-accent-foreground flex justify-between items-center p-4">
            Collect email addresses
            <Select defaultValue="do-not-collect">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Do not collect" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="do-not-collect">Do not collect</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="responder-input">Responder input</SelectItem>
              </SelectContent>
            </Select>
          </DialogDescription>
        </DialogHeader>
        <div>
          <Tabs defaultValue="link" className="p-0">
            <TabsList className="!w-full gap-x-5 px-4 pt-2 pb-0 bg-transparent h-full border-b flex items-center justify-between">
              <div className="flex items-center gap-x-3">
                <p className="text-sm font-medium mb-2">Send via</p>
                {tabs.map(({ value, icon: Icon }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="flex-col !p-0 group after:content-[''] after:h-[3px] data-[state=active]:text-blue-900 text-neutral-950 data-[state=active]:after:bg-blue-900 after:w-full after:mt-2 after:rounded-t-full"
                    asChild
                  >
                    <div className="w-16 space-y-1.5 cursor-auto">
                      <Icon className="w-[18px] h-5" />
                    </div>
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>

            <TabsContent value="link">
              <LinkTabContent />
            </TabsContent>
            <TabsContent value="qr">
              <QrTabContent />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
