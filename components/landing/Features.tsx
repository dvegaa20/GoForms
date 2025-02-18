import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/../components/ui/card";
import { BarChart, CheckCircle, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function Features() {
  const t = await getTranslations("LandingFeatures");
  return (
    <section
      className="w-full pt-12 md:pt-24 lg:pt-32 flex justify-center"
      id="features"
    >
      <div className="container px-4 md:px-6 flex flex-col items-center max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 dark:text-gray-200">
          {t("title")}
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
          <Card className="transform transition-all hover:scale-105">
            <CardHeader>
              <CheckCircle className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>{t("feature1")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{t("feature1Description")}</p>
            </CardContent>
          </Card>
          <Card className="transform transition-all hover:scale-105">
            <CardHeader>
              <BarChart className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>{t("feature2")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{t("feature2Description")}</p>
            </CardContent>
          </Card>
          <Card className="transform transition-all hover:scale-105">
            <CardHeader>
              <Users className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>{t("feature3")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{t("feature3Description")}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
