"use client";
import { useApplicationsStore } from "@/store/useApplications";
import { Card } from "@/components/ui/card";
import { getLineData } from "@/lib/analyticsStats";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function ConversionFunnel() {
  const applications = useApplicationsStore((state) => state.applications);
  const data = getLineData(applications);

  return (
    <Card>
      <h2 className="font-medium mb-1">Interview Conversion Rate</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Application funnel visualization
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--primary)"
            strokeWidth={2}
            dot={{ r: 5, fill: "var(--primary)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
