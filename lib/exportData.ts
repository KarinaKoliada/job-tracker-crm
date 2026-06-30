import { Application } from "@/types/application";

export function exportToCSV(applications: Application[]) {
  const headers = ["Company", "Position", "Status", "Source", "Applied At", "Notes"];

  const rows = applications.map((app) => [
    app.company,
    app.position,
    app.status,
    app.source,
    app.appliedAt,
    app.notes ?? "",
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  downloadFile(csv, "applications.csv", "text/csv");
}

export function exportToJSON(applications: Application[]) {
  const json = JSON.stringify(applications, null, 2);
  downloadFile(json, "applications.json", "application/json");
}

export function importFromJSON(
  file: File,
  setApplications: (apps: Application[]) => void,
  onSuccess: () => void,
  onError: () => void
) {
  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target?.result as string);
      if (Array.isArray(data)) {
        setApplications(data);
        onSuccess();
      } else {
        onError();
      }
    } catch {
      onError();
    }
  };

  reader.readAsText(file);
}

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}