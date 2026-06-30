"use client";
import { useApplicationsStore } from "@/ store/useApplications";
import { Card } from "@/components/ui/card";
import { groupApplicationsByWeek } from "@/lib/analyticsStats";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export function ApplicationsPerWeek() {
  const applications = useApplicationsStore((state) => state.applications);
  const data = groupApplicationsByWeek(applications);

  return (
    <Card className="p-6">
      <h2 className="font-medium mb-1">Applications per Week</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Track your application activity
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="week" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
