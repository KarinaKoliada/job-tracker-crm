import { Application } from "@/types/application";

export const applications: Application[] = [
  {
    id: 1,
    company: "SAP",
    position: "Frontend Developer",
    status: "interview",
    location: "Berlin",
    source: "Linkedin",
    appliedAt: "2026-06-01",
    notes:
      "Had a great chat with the recruiter. Technical interview scheduled for next week, focus on React and TypeScript.",
    timeline: [
      { status: "applied", date: "2026-06-01" },
      { status: "interview", date: "2026-06-08" },
    ],
  },
  {
    id: 2,
    company: "Decathlon",
    position: "Sales Assistant",
    status: "applied",
    location: "Berlin",
    source: "Company site",
    appliedAt: "2026-05-11",
    notes:
      "Applied through their careers page. No response yet, planning to follow up next week.",
    timeline: [{ status: "applied", date: "2026-05-11" }],
  },
  {
    id: 3,
    company: "Spotify",
    position: "Backend Engineer",
    status: "offer",
    location: "Stockholm",
    source: "Referral",
    appliedAt: "2026-04-15",
    notes:
      "Got the offer! Negotiating salary and start date. Relocation package included.",
    timeline: [
      { status: "applied", date: "2026-04-15" },
      { status: "interview", date: "2026-04-25" },
      { status: "offer", date: "2026-05-10" },
    ],
  },
  {
    id: 4,
    company: "Zalando",
    position: "Product Manager",
    status: "rejected",
    location: "Berlin",
    source: "Linkedin",
    appliedAt: "2026-03-20",
    notes:
      "Made it to the final round but they went with an internal candidate. Asked for feedback for future applications.",
    timeline: [
      { status: "applied", date: "2026-03-20" },
      { status: "interview", date: "2026-03-30" },
      { status: "rejected", date: "2026-04-12" },
    ],
  },
  {
    id: 5,
    company: "N26",
    position: "UX Designer",
    status: "interview",
    location: "Remote",
    source: "Other",
    appliedAt: "2026-05-25",
    notes:
      "First call with HR went well. Waiting for the design challenge details.",
    timeline: [
      { status: "applied", date: "2026-05-25" },
      { status: "interview", date: "2026-06-05" },
    ],
  },
  {
    id: 6,
    company: "Delivery Hero",
    position: "Data Analyst",
    status: "ghosted",
    location: "Berlin",
    source: "Company site",
    appliedAt: "2026-02-10",
    notes:
      "Had two interview rounds, then complete silence for over a month. Considering it dead.",
    timeline: [
      { status: "applied", date: "2026-02-10" },
      { status: "interview", date: "2026-02-20" },
    ],
  },
  {
    id: 7,
    company: "Klarna",
    position: "Frontend Developer",
    status: "applied",
    location: "Remote",
    source: "Linkedin",
    appliedAt: "2026-06-09",
    notes:
      "Quick apply via Linkedin Easy Apply. Tailored CV slightly for fintech focus.",
    timeline: [{ status: "applied", date: "2026-06-09" }],
  },
  {
    id: 8,
    company: "BMW Group",
    position: "Software Engineer",
    status: "interview",
    location: "Munich",
    source: "Referral",
    appliedAt: "2026-05-18",
    notes:
      "Referred by a former colleague. Onsite interview scheduled, includes a system design round.",
    timeline: [
      { status: "applied", date: "2026-05-18" },
      { status: "interview", date: "2026-06-02" },
    ],
  },
];
