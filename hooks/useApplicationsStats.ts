import { useApplicationsStore } from "@/store/useApplications";

export function useApplicationStats() {
  const applications = useApplicationsStore((state) => state.applications);

  const total = applications.length;
  const interviews = applications.filter(
    (app) => app.status === "interview",
  ).length;
  const offers = applications.filter((app) => app.status === "offer").length;
  const rejected = applications.filter(
    (app) => app.status === "rejected",
  ).length;

  return { applications, total, interviews, offers, rejected };
}
