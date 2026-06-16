"use client";
import { useApplicationsStore } from "@/ store/useApplications";
import { statusConfig } from "@/config/statusConfig";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";

export function StatusDistribution() {
  const applications = useApplicationsStore((state) => state.applications);
  const total = applications.length;

  const data = Object.entries(statusConfig)
    .map(([key, config]) => ({
      status: key,
      label: config.label,
      count: applications.filter((app) => app.status === key).length,
      hex: config.hex,
    }))
    .filter((item) => item.count > 0);

  return (
    <div>
      <h2 className="font-medium mb-4">Status Distribution</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="label"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((entry) => (
              <Cell
                key={entry.status}
                fill={entry.hex}
                style={{ outline: "none" }}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-2">
        {data.map((item) => (
          <div
            key={item.status}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.hex }}
              />
              <span className="text-muted-foreground">{item.label}</span>
            </div>
            <span className="font-medium">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
