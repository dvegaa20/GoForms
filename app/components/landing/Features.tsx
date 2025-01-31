import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, CheckCircle, Users } from "lucide-react";

export default function Features() {
  return (
    <section
      className="w-full pt-12 md:pt-24 lg:pt-32 flex justify-center"
      id="features"
    >
      <div className="container px-4 md:px-6 flex flex-col items-center max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Features
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
          <Card className="transform transition-all hover:scale-105">
            <CardHeader>
              <CheckCircle className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>Easy Form Creation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Drag-and-drop interface for quick and intuitive form building.
              </p>
            </CardContent>
          </Card>
          <Card className="transform transition-all hover:scale-105">
            <CardHeader>
              <BarChart className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>Advanced Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Get insights from responses with our powerful analytics tools.
              </p>
            </CardContent>
          </Card>
          <Card className="transform transition-all hover:scale-105">
            <CardHeader>
              <Users className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Work together on forms with your team in real-time.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
