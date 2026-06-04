import { Filter } from "@/types/status";

export const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Interview", value: "interview" },
  { label: "Offer", value: "offer" },
  { label: "Rejected", value: "rejected" },
  { label: "Ghosted", value: "ghosted" },
];
