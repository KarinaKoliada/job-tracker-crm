import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import ApplicationForm from "./ApplicationForm";
import { Plus } from "lucide-react";

export default function ApplicationDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>
          <Plus className="w-4 h-4 text-muted" />
          Add Application
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-215! h-[85vh] max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-card p-4 md:p-8 shadow-2xl shadow-black/60">
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
          <span>Fill in the details of your job application</span>
        </DialogHeader>
        <ApplicationForm />
      </DialogContent>
    </Dialog>
  );
}
