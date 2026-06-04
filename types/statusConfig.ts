import { ApplicationStatus } from "@/types/status";

export type StatusConfig = Record<
  ApplicationStatus,
  {
    label: string;
    className: string;
  }
>;