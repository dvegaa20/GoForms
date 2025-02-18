import { Badge } from "@/../components/ui/badge";
import { Button } from "@/../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/../components/ui/card";
import Link from "next/link";

export default function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-medium">{form.title}</CardTitle>
        <CardDescription>{form.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row items-center justify-between">
        <Button asChild size="sm">
          <Link href={`/dashboard/forms/${form.id}`}>View Details</Link>
        </Button>
        <CardDescription>
          <Badge>{form.topic}</Badge>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
