"use client";

import { Button } from "@/../components/ui/button";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("SubmitButton");
  return (
    <Button type="submit" disabled={pending} aria-disabled={pending}>
      {t("submit")}
    </Button>
  );
}
