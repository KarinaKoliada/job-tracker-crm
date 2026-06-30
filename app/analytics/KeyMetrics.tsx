"use client";
import { useApplicationsStore } from "@/ store/useApplications";
import { Card } from "@/components/ui/card";
import { getKeyMetrics } from "@/lib/analyticsStats";

export function KeyMetrics() {
  const applications = useApplicationsStore((state) => state.applications);
  const { interviewRate, offerRate, rejectionRate } =
    getKeyMetrics(applications);

  const metrics = [
    { label: "Interview Rate", value: interviewRate, color: "bg-chart" },
    { label: "Offer Rate", value: offerRate, color: "bg-emerald-500" },
    { label: "Rejection Rate", value: rejectionRate, color: "bg-destructive" },
  ];

  return (
    <Card className="p-6 min-h-full">
      <h2 className="font-medium mb-1">Key Metrics</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Performance indicators
      </p>

      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">{metric.label}</span>
              <span className="font-medium">{metric.value}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${metric.color}`}
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
