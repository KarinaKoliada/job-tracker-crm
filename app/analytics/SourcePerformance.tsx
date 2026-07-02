"use client";
import { useApplicationsStore } from "@/store/useApplications";
import { Card } from "@/components/ui/card";
import { getSourcePerformance } from "@/lib/analyticsStats";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const sourceColors: Record<string, string> = {
  Linkedin: "#0A66C2",
  "Company site": "#7F77DD",
  Referral: "#22c55e",
  Other: "#9ca3af",
};

export function SourcePerformance() {
  const applications = useApplicationsStore((state) => state.applications);
  const data = getSourcePerformance(applications).filter(
    (item) => item.count > 0,
  );

  return (
    <Card className="p-6">
      <h2 className="font-medium mb-1">Source Performance</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Where your applications come from
      </p>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="percent" nameKey="source" outerRadius={90}>
            {data.map((entry) => (
              <Cell
                key={entry.source}
                fill={sourceColors[entry.source]}
                style={{ outline: "none" }}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-2">
        {data.map((item) => (
          <div
            key={item.source}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: sourceColors[item.source] }}
              />
              <span className="text-muted-foreground">{item.source}</span>
            </div>
            <span className="font-medium">{item.percent}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
