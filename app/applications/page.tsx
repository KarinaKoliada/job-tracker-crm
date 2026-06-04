"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { applications } from "@/config/applications";
import { filters } from "@/config/filters";
import { statusConfig } from "@/config/statusConfig";
import { Filter } from "@/types/status";
import { useState } from "react";

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

  return (
    <div>
      <h1>Applications</h1>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search company or position"
          className="border p-2 rounded w-full"
        />
        <div className="flex gap-4 items-center">
          {filters.map((item) => {
            const isActive = item.value === filter;

            return (
              <Button
                className={`flex items-center gap-2 p-2 rounded transition-all duration-200 ease-in-out ${isActive ? "bg-white text-black shadow-sm font-medium" : ""}`}
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

      <div>
        {filteredApplications.map((item) => {
          const status = statusConfig[item.status];
          return (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.company}</CardTitle>
                <CardDescription>{item.position}</CardDescription>
                <CardAction className={`px-2 py-1 rounded ${status.className}`}>
                  {status.label}
                </CardAction>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
