import Link from "next/link";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("LandingFooter");
  const currentYear = new Date().getFullYear();

  return (
    <BackgroundBeamsWithCollision>
      <footer className="w-full py-6 border-t flex justify-center">
        <div className="container max-w-5xl px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {currentYear} GoForms. {t("copyright")}
          </p>
          <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              {t("terms")}
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              {t("privacy")}
            </Link>
          </nav>
        </div>
      </footer>
    </BackgroundBeamsWithCollision>
  );
}
