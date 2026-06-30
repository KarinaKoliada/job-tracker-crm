import { Application } from "@/types/application";

const sources = ["Linkedin", "Company site", "Referral", "Other"] as const;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function weeksAgo(dateStr: string): number {
  const now = new Date();
  const date = new Date(dateStr);
  const diffsMs = now.getTime() - date.getTime();
  return Math.floor(diffsMs / WEEK_MS);
}

export function groupApplicationsByWeek(applications: Application[]) {
  const weeks = Array.from({ length: 6 }, (_, i) => ({
    week: `Week ${i + 1}`,
    count: 0,
  }));

  applications.forEach((app) => {
    const ago = weeksAgo(app.appliedAt);
    const index = 5 - ago;

    if (index >= 0 && index < 6) {
      weeks[index].count += 1;
    }
  });

  return weeks;
}

export function getLineData(applications: Application[]) {
  const appliedCount = applications.length;

  const interviewCount = applications.filter((app) =>
    app.timeline?.some((event) => event.status === "interview"),
  ).length;

  const offerCount = applications.filter((app) =>
    app.timeline?.some((event) => event.status === "offer"),
  ).length;

  return [
    { name: "Applied", value: appliedCount },
    { name: "Interview", value: interviewCount },
    { name: "Offer", value: offerCount },
  ];
}

export function getSourcePerformance(applications: Application[]) {
  const total = applications.length;

  return sources.map((source) => {
    const count = applications.filter((app) => app.source === source).length;
    const percent = total === 0 ? 0 : Math.round((count / total) * 100);

    return { source, count, percent };
  });
}

export function getKeyMetrics(applications: Application[]) {
  const total = applications.length;

  const interviewCount = applications.filter((app) =>
    app.timeline?.some((event) => event.status === "interview"),
  ).length;

  const offerCount = applications.filter((app) =>
    app.timeline?.some((event) => event.status === "offer"),
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === "rejected",
  ).length;

  const interviewRate =
    total === 0 ? 0 : Math.round((interviewCount / total) * 100);
  const offerRate = total === 0 ? 0 : Math.round((offerCount / total) * 100);
  const rejectionRate =
    total === 0 ? 0 : Math.round((rejectedCount / total) * 100);

  return {
    interviewRate,
    offerRate,
    rejectionRate,
  };
}
