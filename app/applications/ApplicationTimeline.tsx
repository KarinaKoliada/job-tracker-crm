import { useApplicationsStore } from "@/store/useApplications";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { statusConfig } from "@/config/statusConfig";
import { ApplicationStatus } from "@/types/status";

const flow: ApplicationStatus[] = ["applied", "interview", "offer"];

type Props = {
  applicationId: number;
};

export default function ApplicationTimeline({ applicationId }: Props) {
  const application = useApplicationsStore((state) =>
    state.applications.find((app) => app.id === applicationId),
  );

  if (!application) return null;

  const timeline = application.timeline ?? [];
  const currentIndex = flow.indexOf(application.status);

  return (
    <Card className="p-6">
      <h2 className="font-medium mb-6">Application Timeline</h2>

      <div className="flex flex-col">
        {flow.map((stepStatus, index) => {
          const event = timeline.find((e) => e.status === stepStatus);
          const isPast = index <= currentIndex;
          const isLast = index === flow.length - 1;

          return (
            <div key={stepStatus} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    isPast
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                </div>
                {!isLast && (
                  <div
                    className={`w-0.5 flex-1 ${
                      index < currentIndex ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>

              <div className={`pb-8 ${isPast ? "" : "opacity-50"}`}>
                <p className="font-semibold">
                  {statusConfig[stepStatus].label}
                </p>
                <p className="text-sm text-muted-foreground">
                  {event?.date ?? ""}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
