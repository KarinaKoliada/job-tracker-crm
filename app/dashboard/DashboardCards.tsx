"use client";
import { useApplicationsStore } from "@/ store/useApplications";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LucideBriefcase,
  LucideCheckCircle,
  LucideUsers,
  LucideX,
} from "lucide-react";

export default function DashboardCards() {
  const { applications } = useApplicationsStore();

  const total = applications.length;
  const interviews = applications.filter(
    (app) => app.status === "interview",
  ).length;
  const offers = applications.filter((app) => app.status === "offer").length;
  const rejected = applications.filter(
    (app) => app.status === "rejected",
  ).length;

  const stats = [
    {
      label: "Total Applications",
      value: total,
      icon: LucideBriefcase,
      color: "text-primary bg-orange-500/10",
    },
    {
      label: "Interviews",
      value: interviews,
      icon: LucideUsers,
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      label: "Offers",
      value: offers,
      icon: LucideCheckCircle,
      color: "text-green-500 bg-green-500/10",
    },
    {
      label: "Rejected",
      value: rejected,
      icon: LucideX,
      color: "text-red-500 bg-red-500/10",
    },
  ];
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            className="flex flex-row items-center justify-between p-4"
          >
            <CardHeader className="p-0 flex-1 min-w-0">
              <CardTitle className="text-sm">
                <p>{stat.label}</p>
              </CardTitle>
              <p className="text-2xl font-semibold">
                {stat.value.toLocaleString()}
              </p>
            </CardHeader>
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}
            >
              <Icon className="w-5 h-5" />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
