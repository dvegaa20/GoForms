"use client";

import { BarChart, Card } from "@tremor/react";

export default function BarChartComponent({ responses }: { responses: any }) {
  return (
    <Card>
      <BarChart
        className="mt-6"
        data={responses}
        index="value"
        showLegend={false}
        categories={["count"]}
        colors={["blue-800"]}
        yAxisWidth={48}
      />
    </Card>
  );
}
