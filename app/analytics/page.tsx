import { ApplicationsPerWeek } from "./ApplicationsPerWeek";
import { ConversionFunnel } from "./ConversionFunnel";
import { KeyMetrics } from "./KeyMetrics";
import { SourcePerformance } from "./SourcePerformance";

export default function AnalyticsPage() {
  return (
    <div className="gap-4 flex flex-col items-stretch">
      <h1>Analytics</h1>
      <ApplicationsPerWeek />
      <ConversionFunnel />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SourcePerformance />
        <KeyMetrics/>
      </div>
    </div>
  );
}
