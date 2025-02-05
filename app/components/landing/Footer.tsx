import Link from "next/link";
import React from "react";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <BackgroundBeamsWithCollision>
      <footer className="w-full py-6 border-t flex justify-center">
        <div className="container max-w-5xl px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {currentYear} GoForms. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </BackgroundBeamsWithCollision>
  );
}
