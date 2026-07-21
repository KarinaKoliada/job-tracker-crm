'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useApplicationsStore } from "@/store/useApplications";
import { ChartLine, LayoutDashboard, Mail, Search } from "lucide-react";

export default function Home() {
  const applications = useApplicationsStore((state) => state.applications)
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center text-center py-16 px-6">
        <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full mb-6">
          ✦ AI-powered job tracking
        </span>
        <h1 className="text-4xl font-medium max-w-lg leading-tight mb-4">
          Track every application, land your next job
        </h1>
        <p className="text-muted-foreground max-w-md mb-8">
          Stay on top of your job search with smart tracking, analytics, and
          AI-generated cover letters — all in one place.
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/dashboard">Get started →</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/applications">View demo</Link>
          </Button>
        </div>
      </div>

      <div className="flex gap-12 justify-center py-8 border-y border-border mx-6 flex-wrap">
        {[
          { num: applications.length, label: "Applications tracked" },
          { num: "5", label: "Statuses supported" },
          { num: "AI", label: "Cover letter generator" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-medium">{stat.num}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 p-6">
        {[
          { icon: LayoutDashboard, title: "Dashboard", desc: "See your job search at a glance — totals, interviews, offers." },
          { icon: ChartLine, title: "Analytics", desc: "Track conversion rates, weekly activity, and source performance." },
          { icon: Mail, title: "AI cover letters", desc: "Generate personalized cover letters for each application instantly." },
          { icon: Search, title: "Smart filters", desc: "Filter and sort by status, date, source, and more." },
        ].map((f) => (
          <Card key={f.title} className="p-5">
            <div className="text-2xl mb-3">
              <f.icon className="w-5 h-5 text-primary"/>
            </div>
            <p className="font-medium mb-1">{f.title}</p>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}