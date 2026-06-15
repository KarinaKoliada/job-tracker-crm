import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Application } from "@/types/application";
import { applications as seed } from "@/config/applications";

interface ApplicationsState {
  applications: Application[];
  addApplication: (app: Omit<Application, "id">) => void;
  deleteApplication: (id: number) => void;
  updateApplication: (id: number, updatedData: Partial<Application>) => void;
}

export const useApplicationsStore = create<ApplicationsState>()(
  persist(
    (set) => ({
      applications: seed,

      addApplication: (app) =>
        set((state) => ({
          applications: [
            {
              ...app,
              id: Date.now(),
              timeline: [{ status: app.status, date: app.appliedAt }],
            },
            ...state.applications,
          ],
        })),

      deleteApplication: (id) =>
        set((state) => ({
          applications: state.applications.filter((app) => app.id !== id),
        })),

      updateApplication: (id, updatedData) =>
        set((state) => ({
          applications: state.applications.map((app) => {
            if (app.id !== id) return app;

            const statusChanged =
              updatedData.status && updatedData.status !== app.status;

            return {
              ...app,
              ...updatedData,
              timeline: statusChanged
                ? [
                    ...(app.timeline ?? []),
                    {
                      status: updatedData.status!,
                      date: new Date().toISOString().slice(0, 10),
                    },
                  ]
                : app.timeline,
            };
          }),
        })),
    }),
    {
      name: "applications-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
