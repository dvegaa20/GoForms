import React from "react";
import { getResponses } from "@/../lib/actions/actions";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ResponsesTab from "./tabs/ResponsesTab";

export default async function ResponsesHeader({ id }: { id: string }) {
  const responses = await getResponses({ id });
  return (
    <Card>
      <hr className="w-full border-t-8 rounded-t-xl border-violet-800" />
      <CardHeader>
        <CardTitle className="font-normal">
          {responses.length} {responses.length === 1 ? "Response" : "Responses"}
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <ResponsesTab />
      </CardFooter>
    </Card>
  );
}
