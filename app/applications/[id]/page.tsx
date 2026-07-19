"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardAction } from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useApplicationsStore } from "@/store/useApplications";
import { statusConfig } from "@/config/statusConfig";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAvatarStyle } from "../page";
import { Calendar, ExternalLink, MapPin } from "lucide-react";
import ApplicationTimeline from "../ApplicationTimeline";
import { ApplicationStatus } from "@/types/status";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import CoverLetter from "./CoverLetter";

const sources = ["Linkedin", "Company site", "Referral", "Other"] as const;

export default function ApplicationDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const { applications, deleteApplication, updateApplication } =
    useApplicationsStore();

  const application = applications.find((app) => app.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<{
    company: string;
    position: string;
    location: string;
    source: "Linkedin" | "Company site" | "Referral" | "Other";
    status: ApplicationStatus;
    appliedAt: string;
    notes: string;
  }>({
    company: application?.company || "",
    position: application?.position || "",
    location: application?.location || "",
    source: application?.source || "Linkedin",
    status: application?.status || "applied",
    appliedAt: application?.appliedAt || "",
    notes: application?.notes || "",
  });

  if (!application) {
    return <div className="p-6">Application not found</div>;
  }

  const handleDelete = () => {
    deleteApplication(id);
    toast.success("Application deleted");
    router.push("/applications");
  };

  const handleUpdate = () => {
    updateApplication(id, form);
    setIsEditing(false);
    toast.success("Application updated");
  };

  const status = statusConfig[application.status];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="p-4">
        <div className="flex  justify-between items-start ">
          <div className="flex gap-4">
            <div
              className={`w-16 h-16 rounded-lg flex items-center justify-center font-semibold text-3xl ${getAvatarStyle(
                form.company,
              )}`}
            >
              {form.company[0]}
            </div>
            <div>
              {isEditing ? (
                <Input
                  value={form.position}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, position: e.target.value }))
                  }
                />
              ) : (
                <p className="text-2xl ">{application.position}</p>
              )}
              {isEditing ? (
                <div>
                  <Input
                    value={form.company}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        company: e.target.value,
                      }))
                    }
                    className="text-2xl font-semibold h-auto py-1"
                  />
                </div>
              ) : (
                <h1 className="text-xl text-muted-foreground font-semibold">
                  {application.company}
                </h1>
              )}
            </div>
          </div>

          {isEditing ? (
            <Select
              value={form.status}
              onValueChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  status: value as typeof form.status,
                }))
              }
            >
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="ghosted">Ghosted</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <CardAction className={status.className}>{status.label}</CardAction>
          )}
        </div>

        <div className=" text-sm flex flex-col md:flex-row md:justify-between md:items-center mt-5 gap-5">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <div className="flex flex-col">
              <span className="text-muted-foreground">Location</span>
              {isEditing ? (
                <Input
                  value={form.location}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, location: e.target.value }))
                  }
                  className="max-w-48"
                />
              ) : (
                <span>{application.location}</span>
              )}
            </div>
          </div>

          <div className="flex ">
            <div className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              <div className="flex flex-col">
                <span className="text-muted-foreground">Source</span>
                {isEditing ? (
                  <Select
                    value={form.source}
                    onValueChange={(value) =>
                      setForm((prev) => ({
                        ...prev,
                        source: value as typeof form.source,
                      }))
                    }
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sources.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <span>{application.source}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <div className="flex flex-col">
                <span className="text-muted-foreground">Applied</span>
                {isEditing ? (
                  <Input
                    type="date"
                    value={form.appliedAt}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        appliedAt: e.target.value,
                      }))
                    }
                    className="max-w-48"
                  />
                ) : (
                  <span>{application.appliedAt}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
      <ApplicationTimeline applicationId={id} />
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="font-medium">Notes</h2>
            {isEditing ? (
              <Textarea
                value={form.notes}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, notes: e.target.value }))
                }
                className="resize-none min-h-32"
              />
            ) : (
              <p className="text-muted-foreground">
                {application.notes || "No notes"}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      <CoverLetter
        company={application.company}
        notes={application.notes ?? ''}
        position={application.position}
      />
      <div className="max-w-3xl  mx-auto flex gap-3">
        {isEditing ? (
          <>
            <Button className="flex-1" onClick={handleUpdate}>
              Save
            </Button>
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button className="flex-3" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="flex-1" variant="destructive">
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this application?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
