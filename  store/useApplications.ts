import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Application } from "@/types/application";
import { applications, applications as seed } from "@/config/applications";

interface ApplicationsState {
  applications: Application[];
  addApplication: (app: Omit<Application, "id">) => void;
  setApplications: (apps: Application[]) => void;
  deleteApplication: (id: number) => void;
  updateApplication: (id: number, updatedData: Partial<Application>) => void;
}

export const useApplicationsStore = create<ApplicationsState>()(
  persist(
    (set) => ({
      applications: seed,

      setApplications: (apps) => set({ applications: apps }),

      addApplication: (app) =>
        set((state) => ({
          applications: [{ ...app, id: Date.now() }, ...state.applications],
        })),

      deleteApplication: (id: number) =>
        set((state) => ({
          applications: state.applications.filter((app) => app.id !== id),
        })),

      updateApplication: (id, updatedData) =>
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id ? { ...app, ...updatedData } : app,
          ),
        })),
    }),
    {
      name: "applications-storage",
    },
  ),
);
