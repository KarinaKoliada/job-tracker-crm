import { StatusConfig } from "@/types/statusConfig";

export const statusConfig: StatusConfig = {
  applied: {
    label: "Applied",
    className: "bg-yellow-100 text-yellow-700",
  },
  interview: {
    label: "Interview",
    className: "bg-green-100 text-green-700",
  },
  offer: {
    label: "Offer",
    className: "bg-blue-100 text-blue-700",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-700",
  },
  ghosted: {
    label: "Ghosted",
    className: "bg-gray-100 text-gray-700",
  },
} as const;
