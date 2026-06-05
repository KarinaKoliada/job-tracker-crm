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

export default function AppliactionPage() {
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
      "bg-[#4f39f6]/10 text-[#4f39f6]",
      "bg-pink-500/10 text-pink-500",
      "bg-green-500/10 text-green-500",
      "bg-yellow-500/10 text-yellow-500",
      "bg-blue-500/10 text-blue-500",
      "bg-purple-500/10 text-purple-500",
    ];

    const index = company.charCodeAt(0) % colors.length;

    return colors[index];
  };

  return (
    <div>
      <ApplicationDialog/>
      <div className="flex flex-col mb-5 md:mb-8">
        <h1 className="text-3xl mb-1">Applications</h1>
        <span className="text-[#99a1af] text-lg">
          Manage and filter your job applications
        </span>
      </div>{" "}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          value={search}
          placeholder="Search company or position"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-4 items-center">
          {filters.map((item) => {
            const isActive = item.value === filter;

            return (
              <Button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all border-gray-700  duration-200 ease-in-out hover:bg-[#4f39f6] ${isActive ? "bg-[#4f39f6] text-white shadow-sm font-medium" : ""}`}
                key={item.value}
                onClick={() => setFilter(item.value)}
              >
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>
      <Button>Add application</Button>
      <div className="grid md:grid-cols-2 gap-6">
        {filteredApplications.map((item) => {
          const status = statusConfig[item.status];
          return (
            <Card
              key={item.id}
              className="relative group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 border border-border/50 bg-background/60 backdrop-blur-xl overflow-hidden"
            >
              <div
                className="absolute -inset-1 opacity-0 group-hover:opacity-20 transition
    bg-linear-to-r from-[#4f39f6] via-purple-500 to-cyan-400
    blur-2xl pointer-events-none -z-10"
              />
              <CardContent className="relative p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center
          font-semibold  text-sm ${getAvatarStyle(item.company)}`}
                    >
                      {item.company.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  <CardAction
                    className={`flex items-center h-6 px-2 text-xs rounded ${status.className}`}
                  >
                    {status.label}
                  </CardAction>
                </div>

                <CardTitle>
                  <div className="flex flex-col text-xl">
                    {item.company}
                    <span className="text-lg text-muted-foreground">
                      {item.position}
                    </span>
                  </div>
                </CardTitle>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
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
