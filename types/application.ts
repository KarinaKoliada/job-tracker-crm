import { ApplicationStatus } from "./status";

export type Application = {
  id: number;
  company: string;
  position: string;
  status: ApplicationStatus;
  location?: string;
  source?: "Linkedin" | "Company site" | "Referral" | "Other";
  appliedAt: string;
  notes?: string;
}