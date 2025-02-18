import Link from "next/link";
import { Button } from "../ui/button";
import { Layers } from "lucide-react";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../ModeToggle";
import { LanguageSwitcher } from "../LangToggle";
import { getTranslations } from "next-intl/server";

export default async function Header() {
  const t = await getTranslations("LandingHeader");
  return (
    <BackgroundBeamsWithCollision>
      <header className="w-full px-4 lg:px-6 h-20 flex items-center justify-between border-b">
        <div className="container max-w-7xl mx-auto flex justify-between items-center">
          <Link className="flex items-center justify-center" href="#">
            <Layers className="h-6 w-6 text-primary" />
            <span className="ml-2 text-xl font-bold">GoForms</span>
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:flex items-center gap-4 sm:gap-6">
              <Link
                className="text-sm font-medium hover:text-primary transition-colors"
                href="#features"
              >
                {t("navLink1")}
              </Link>
              <Link
                className="text-sm font-medium hover:text-primary transition-colors"
                href="#cta"
              >
                {t("navLink2")}
              </Link>
            </div>
            <div className="flex justify-end space-x-2">
              <LanguageSwitcher />
              <ModeToggle />
            </div>
            <SignedOut>
              <Button asChild>
                <SignInButton mode="modal" forceRedirectUrl="/dashboard" />
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </nav>
        </div>
      </header>
    </BackgroundBeamsWithCollision>
  );
}
