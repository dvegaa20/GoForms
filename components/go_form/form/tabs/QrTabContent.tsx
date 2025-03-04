"use client";

import { useParams } from "next/navigation";
import { TabsContent } from "@/../components/ui/tabs";
import { Button } from "@/../components/ui/button";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import { Download, Share } from "lucide-react";
import { Card, CardContent } from "@/../components/ui/card";
import { useTranslations } from "next-intl";

export default function QrTabContent() {
  const params = useParams();
  const id = params?.id;
  const url = `${window.location.origin}/forms/${id}`;
  const t = useTranslations("SendForm");

  const shareQR = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Form Link",
          text: "Check out this form:",
          url: url,
        })
        .then(() => toast.success(t("toastQrCopied")))
        .catch((error) => {
          if (error.name !== "AbortError") {
            toast.error(t("toastQrCopiedError"));
          }
        });
    } else {
      toast.error(t("toastQrError"));
    }
  };

  const downloadQR = () => {
    const svg = document.getElementById("qr-code");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "qr-code";
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
    toast.success(t("toastQrDownloaded"));
  };

  return (
    <TabsContent value="qr" className="px-4 py-6 space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4">
            <QRCodeSVG id="qr-code" value={url} size={200} level="H" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button size="sm" variant="outline" onClick={shareQR}>
          <Share className="w-4 h-4 mr-2" />
          {t("shareLink")}
        </Button>
        <Button size="sm" onClick={downloadQR}>
          <Download className="w-4 h-4 mr-2" />
          {t("downloadQR")}
        </Button>
      </div>
    </TabsContent>
  );
}
