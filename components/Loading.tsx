import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LoadingPage() {
  const t = useTranslations("Loading");
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 dark:bg-black">
      <div className="flex flex-col items-center justify-center p-6 space-y-4">
        <Loader className="w-12 h-12 text-primary animate-spin" />
        <p className="text-xl font-semibold text-foreground animate-pulse">
          {t("title")}
        </p>
      </div>
    </div>
  );
}
