"use client";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { applications } from "@/config/applications";
import { filters } from "@/config/filters";
import { statusConfig } from "@/config/statusConfig";
import { Filter } from "@/types/status";
import { useState } from "react";
import ApplicationDialog from "./ApplicationDialog";

export default function ApplicationPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const statusFiltered =
    filter === "all"
      ? applications
      : applications.filter((item) => item.status === filter);

  const filteredApplications = statusFiltered.filter((item) => {
    const query = search.toLowerCase();
    return (
      item.company.toLowerCase().includes(query) ||
      item.position.toLowerCase().includes(query)
    );
  });

  const getAvatarStyle = (company: string) => {
    const colors = [
      "bg-primary/10 text-primary",
      "bg-pink-500/10 text-pink-500",
      "bg-green-500/10 text-green-500",
      "bg-yellow-500/10 text-yellow-500",
      "bg-blue-500/10 text-blue-500",
      "bg-purple-500/10 text-purple-500",
    ];

    return colors[company.charCodeAt(0) % colors.length];
  };

  return (
    <div className="space-y-8">
      <ApplicationDialog />

      <div className="space-y-1">
        <h1 className="text-3xl text-foreground">Applications</h1>
        <p className="text-muted-foreground">
          Manage and filter your job applications
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          value={search}
          placeholder="Search company or position"
          onChange={(e) => setSearch(e.target.value)}
          className="md:max-w-sm"
        />

        <div className="flex gap-2 flex-wrap">
          {filters.map((item) => {
            const isActive = item.value === filter;

            return (
              <Button
                key={item.value}
                onClick={() => setFilter(item.value)}
                variant={isActive ? "default" : "outline"}
              >
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3  gap-4 md:gap-6">
        {filteredApplications.map((item) => {
          const status = statusConfig[item.status];

          return (
            <Card
              key={item.id}
              className="
                bg-card
                border border-border
                hover:shadow-xl
                transition
                duration-300
              "
            >
              <CardContent className="p-4 md:p-5 flex flex-col gap-4">
                <div className="flex justify-between ">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center font-semibold ${getAvatarStyle(
                      item.company
                    )}`}
                  >
                    {item.company[0]}
                  </div>

                  <CardAction className={status.className }>
                    {status.label}
                  </CardAction>
                </div>

                <CardTitle>
                  <div className="text-foreground text-xl">
                    {item.company}
                  </div>
                  <div className="text-muted-foreground">
                    {item.position}
                  </div>
                </CardTitle>

                <div className="text-sm text-muted-foreground space-y-2">
                  <div className="flex justify-between">
                    <span>Location</span>
                    <span className="text-foreground">{item.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Source</span>
                    <span className="text-foreground">{item.source}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Applied</span>
                    <span className="text-foreground">{item.appliedAt}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}