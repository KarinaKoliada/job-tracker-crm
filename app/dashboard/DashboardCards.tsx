"use client";
import { useApplicationsStore } from "@/store/useApplications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { statusConfig } from "@/config/statusConfig";
import { getAvatarStyle } from "../applications/page";
import { useRouter } from "next/navigation";

export function DashboardCards() {
  const applications = useApplicationsStore((state) => state.applications);
  const recentApplications = [...applications]
    .sort(
      (a, b) =>
        new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime(),
    )
    .slice(0, 8);
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Applications</CardTitle>
        <Link href="/applications" className="text-sm text-primary">
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Applied</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentApplications.map((app) => {
              const status = statusConfig[app.status];
              return (
                <TableRow
                  key={app.id}
                  onClick={() => router.push(`/applications/${app.id}`)}
                  className="cursor-pointer hover:bg-muted"
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm ${getAvatarStyle(app.company)}`}
                      >
                        {app.company[0]}
                      </div>
                      {app.company}
                    </div>
                  </TableCell>
                  <TableCell>{app.position}</TableCell>
                  <TableCell>
                    <span className={status.className}>{status.label}</span>
                  </TableCell>
                  <TableCell>{app.appliedAt}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
