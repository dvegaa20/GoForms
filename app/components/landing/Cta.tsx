import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Cta() {
  return (
    <section
      className="w-full py-12 md:py-24 lg:py-32 flex justify-center"
      id="cta"
    >
      <div className="container px-4 md:px-6 flex flex-col items-center text-center max-w-5xl">
        <div className="space-y-4 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Ready to Create Amazing Forms?
          </h2>
          <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
            Join thousands of satisfied users and start creating forms today.
          </p>
        </div>
        <Button asChild size="lg" className="mt-8 animate-bounce">
          <Link href={"dashboard"}>Start Right Now</Link>
        </Button>
      </div>
    </section>
  );
}
