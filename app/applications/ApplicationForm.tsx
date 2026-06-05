import { Button } from "@/components/ui/button";
import { Application } from "@/types/application";
import { ApplicationStatus } from "@/types/status";
import { useState } from "react";

export default function ApplicationForm() {
  const steps = ["basic", "details", "notes"] as const;
  type Step = (typeof steps)[number];
  const [currentStep, setCurrentStep] = useState<Step>("basic");
  const currentIndex = steps.indexOf(currentStep);

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
  return (
    <div>
      <div>
        <div>
          {currentStep === "basic" && <span>Basic</span>}
          {currentStep === "details" && <span>Details</span>}
          {currentStep === "notes" && <span>Notes</span>}
        </div>
        <Button onClick={handleNext}>Next</Button>
        <Button disabled={currentIndex === 0} onClick={handleBack}>
          Back
        </Button>
      </div>
      <form>
        {currentIndex === 0 && (
          <div>
            <div>
              <label htmlFor="text">Company Name</label>
              <input
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
            <div>
              <label htmlFor="text">Job Role</label>
              <input
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
            <div>
              <label htmlFor="text">Location</label>
              <input
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
        )}
        {currentIndex === 1 && (
          <div>
            <div>
              <label htmlFor="date">Application Date</label>
              <input
                type="date"
                value={form.appliedAt}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, appliedAt: e.target.value }))
                }
              />
            </div>
            <div>
              <label htmlFor="text">Application Source</label>
              <select
                value={form.source}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    source: e.target.value as Source,
                  }))
                }
              >
                {sources.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="text">Status</label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    status: e.target.value as ApplicationStatus,
                  }))
                }
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
                <option value="ghosted">Ghosted</option>
              </select>
            </div>
          </div>
        )}

        {currentIndex === 2 && (
          <div>
            <label htmlFor="text">Notes (Optional)</label>
            <textarea
              value={form.notes}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, notes: e.target.value }))
              }
              placeholder="Add any additional info about this application"
            />
          </div>
        )}
      </form>
    </div>
  );
}
