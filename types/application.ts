import { ApplicationStatus } from "./status";

export type Application = {
  id: number;
  company: string;
  position: string;
  status: ApplicationStatus;
}