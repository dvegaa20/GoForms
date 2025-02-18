import { Button } from "../ui/button";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
export default async function Cta() {
  const t = await getTranslations("LandingCta");
  return (
    <section
      className="w-full py-12 md:py-24 lg:py-32 flex justify-center"
      id="cta"
    >
      <div className="container px-4 md:px-6 flex flex-col items-center text-center max-w-5xl">
        <div className="space-y-4 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl dark:text-gray-200">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
            {t("subtitle")}
          </p>
        </div>
        <Button asChild size="lg" className="mt-8 animate-bounce">
          <Link href={"dashboard"}>{t("button")}</Link>
        </Button>
      </div>
    </section>
  );
}
