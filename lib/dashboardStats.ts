import { Application } from "@/types/application";

export function getLastMonthEndDate() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 0);
}

export function countApplicationsBefore(
  applications: Application[],
  cutoffDate: Date,
): number {
  return applications.filter((app) => new Date(app.appliedAt) <= cutoffDate)
    .length;
}

export function calculatePercentChange(
  currentTotal: number,
  previousTotal: number,
): number | null {
  if (previousTotal === 0) return null;
  return ((currentTotal - previousTotal) / previousTotal) * 100;
}

export function getMonthlyChange(
  applications: Application[],
  statusFilter?: Application["status"],
): number | null {
  const filtered = statusFilter
    ? applications.filter((app) => app.status === statusFilter)
    : applications;

  const currentTotal = filtered.length;
  const lastMonthEnd = getLastMonthEndDate();
  const previousTotal = countApplicationsBefore(filtered, lastMonthEnd);

  return calculatePercentChange(currentTotal, previousTotal);
}
