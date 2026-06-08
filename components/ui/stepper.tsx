import { Check } from "lucide-react";

const steps = ["company", "details", "notes"] as const;
type Step = (typeof steps)[number];

export function Stepper({ currentStep }: { currentStep: Step }) {
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="flex w-full items-center mb-6">
      {steps.map((step, index) => {
        const isActive = index === currentIndex;
        const isDone = index < currentIndex;

        return (
          <>
            <div key={step} className="flex flex-col items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                transition-all duration-300
                ${isDone
                  ? "bg-primary text-white"
                  : isActive
                    ? "bg-primary text-white scale-110"
                    : "bg-primary-foreground text-gray-500"
                }
              `}>
                {isDone ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span className={`text-xs mt-2 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {step}
              </span>
            </div>

            {index !== steps.length - 1 && (
              <div key={`line-${index}`} className="flex-1 h-0.5 mx-3 relative mb-5">
                <div className="bg-gray-200 h-full w-full rounded" />
                <div
                  className="absolute top-0 left-0 h-full bg-primary rounded transition-all duration-300"
                  style={{ width: isDone ? "100%" : "0%" }}
                />
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}