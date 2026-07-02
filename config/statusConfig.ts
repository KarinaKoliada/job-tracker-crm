import { StatusConfig } from "@/types/statusConfig";

export const statusConfig: StatusConfig = {
  applied: {
    label: "Applied",
    className: "bg-green-200 text-green-700 rounded-lg px-2",
    hex: "#facc15",
  },
  interview: {
    label: "Interview",
    className: "bg-yellow-200 text-yellow-700 rounded-lg px-2",
    hex: "#22c55e",
  },
  offer: {
    label: "Offer",
    className: "bg-blue-200 text-blue-700 rounded-lg px-2",
    hex: "#3b82f6",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-200 text-red-700 rounded-lg px-2",
    hex: "#ef4444",
  },
  ghosted: {
    label: "Ghosted",
    className: "bg-gray-200 text-gray-700 rounded-lg px-2",
    hex: "#9ca3af",
  },
} as const;
