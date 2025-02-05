import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex justify-center pt-36">
      <div className=" px-4 md:px-6 flex flex-col items-center text-center max-w-5xl">
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-purple-600">
            Create Beautiful Forms in Minutes
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            GoForms helps you create, share, and analyze forms with ease. Start
            for free and upgrade as you grow.
          </p>
        </div>
        <div className="space-x-4 mt-8">
          <Button asChild size="lg" className="animate-pulse">
            <Link href={"/dashboard"}>Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
