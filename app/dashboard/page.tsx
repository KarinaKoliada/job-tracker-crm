import { Button } from "@/components/ui/button";
import { StatusDistribution } from "./StatusDistribution";
import DashboardStatsCards from "./DashboardStatsCards";
import { DashboardCards } from "./DashboardCards";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button variant="outline">Add application</Button>
      </div>
      <DashboardStatsCards />
      <StatusDistribution />
      <DashboardCards />
    </div>
  );
}
