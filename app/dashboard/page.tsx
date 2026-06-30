import { StatusDistribution } from "./StatusDistribution";
import DashboardStatsCards from "./DashboardStatsCards";
import { DashboardCards } from "./DashboardCards";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <DashboardStatsCards />
      <div className=" grid gap-6 lg:grid-cols-2 lg:gap-4">
        <StatusDistribution />
        <DashboardCards />
      </div>
    </div>
  );
}
