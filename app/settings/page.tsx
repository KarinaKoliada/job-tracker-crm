"use client";

import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { exportToCSV, exportToJSON, importFromJSON } from "@/lib/exportData";
import { useApplicationsStore } from "@/store/useApplications";
import ThemeToggle from "@/components/theme-toggle";

export default function SettingsPage() {
  const applications = useApplicationsStore((state) => state.applications);
  const setApplications = useApplicationsStore(
    (state) => state.setApplications,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);

  function showMessage(text: string) {
    setMessage(text);
    setTimeout(() => setMessage(null), 3000);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    importFromJSON(
      file,
      setApplications,
      () => showMessage("✅ Data imported successfully"),
      () => showMessage("❌ Invalid file format"),
    );

    e.target.value = "";
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Settings</h1>

      <Card className="p-6">
        <h2 className="font-medium mb-1">Appearance</h2>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Switch between light and dark mode
          </p>
          <ThemeToggle />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-medium mb-1">Export Data</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Download your applications
        </p>
        <div className="flex gap-3">
          <Button onClick={() => exportToCSV(applications)}>Export CSV</Button>
          <Button variant="outline" onClick={() => exportToJSON(applications)}>
            Export JSON
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-medium mb-1">Import Data</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Restore your applications from a JSON file
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImport}
        />
        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
          Choose File
        </Button>

        {message && (
          <p className="mt-3 text-sm text-muted-foreground">{message}</p>
        )}
      </Card>
    </div>
  );
}
