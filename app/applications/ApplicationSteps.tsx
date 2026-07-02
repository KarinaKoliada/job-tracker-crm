import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Stepper } from "@/components/ui/stepper";
import { Application } from "@/types/application";
import { ApplicationStatus } from "@/types/status";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useApplicationsStore } from "@/store/useApplications";
import { toast } from "sonner";

type Props = {
  onClose: () => void;
};

export default function ApplicationForm({ onClose }: Props) {
  const steps = ["company", "details", "notes"] as const;
  type Step = (typeof steps)[number];
  const [currentStep, setCurrentStep] = useState<Step>("company");
  const currentIndex = steps.indexOf(currentStep);
  const addApplication = useApplicationsStore((state) => state.addApplication);
  const [form, setForm] = useState<Omit<Application, "id">>({
    company: "",
    position: "",
    location: "",
    source: "Linkedin",
    notes: "",
    status: "interview",
    appliedAt: new Date().toISOString().slice(0, 10),
  });

  const sources = ["Linkedin", "Company site", "Referral", "Other"] as const;
  type Source = (typeof sources)[number];

  const handleNext = () => {
    const nextStep = steps[currentIndex + 1];
    if (nextStep) {
      setCurrentStep(nextStep);
    }
  };

  const handleBack = () => {
    const prevStep = steps[currentIndex - 1];

    if (prevStep) {
      setCurrentStep(prevStep);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addApplication({
      company: form.company,
      position: form.position,
      location: form.location,
      source: form.source,
      status: form.status,
      notes: form.notes,
      appliedAt: form.appliedAt,
    });

    toast.success("Application has been added")

    onClose();
  };

  const isStepValid = () => {
    switch (currentStep) {
      case "company":
        return form.company.trim() && form.position.trim();
      case "details":
        return form.appliedAt;
      case "notes":
        return true;
    }
  };

  console.log("FORM");
  const renderStep = () => {
    switch (currentStep) {
      case "company":
        return (
          <div className="flex flex-col gap-3 md:gap-6 p-4 md:p-6 bg-muted border border-border rounded-xl backdrop-blur-md border">
            <div className="flex flex-col gap-2">
              <Label htmlFor="text">Company Name</Label>
              <Input
                value={form.company}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    company: e.target.value,
                  }))
                }
                placeholder="e.g., Google"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="text">Job Role</Label>
              <Input
                value={form.position}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    position: e.target.value,
                  }))
                }
                placeholder="e.g., Senior Frontend Developer"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="text">Location</Label>
              <Input
                value={form.location}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                placeholder="e.g., Berlin"
              />
            </div>
          </div>
        );
      case "details":
        return (
          <div className="flex flex-col gap-3 md:gap-6 p-4 md:p-6 bg-muted border border-border rounded-xl ">
            <div className="flex flex-col gap-2">
              <Label htmlFor="date">Application Date</Label>
              <Input
                type="date"
                value={form.appliedAt}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, appliedAt: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="text">Application Source</Label>
              <Select
                value={form.source}
                onValueChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    source: value as Source,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  {sources.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="text">Status</Label>
              <Select
                value={form.status}
                onValueChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    status: value as ApplicationStatus,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="ghosted">Ghosted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case "notes":
        return (
          <div className="flex flex-col gap-3 md:gap-6 p-4 md:p-6 bg-muted border border-border rounded-xl ">
            <Label htmlFor="text">Notes (Optional)</Label>
            <Textarea
              className="md:min-h-43 min-h-40 resize-none"
              value={form.notes}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, notes: e.target.value }))
              }
              placeholder="Add any additional info about this application"
            />
          </div>
        );
    }
  };
  return (
    <div>
      <div className="mt-6">
        <Stepper currentStep={currentStep} />
      </div>
      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        {renderStep()}
        <div className="flex justify-between">
          <Button
            type="button"
            disabled={currentIndex === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          {currentIndex < steps.length - 1 && (
            <Button
              type="button"
              disabled={!isStepValid()}
              onClick={handleNext}
            >
              Next
            </Button>
          )}
          {currentIndex === steps.length - 1 && (
            <Button type="submit">Submit Application</Button>
          )}
        </div>
      </form>
    </div>
  );
}
