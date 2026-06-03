import { NavItem } from "@/types/navigation";
import { LayoutDashboard } from "lucide-react";

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/applications", label: "Applications" },
  { href: "/settings", label: "Settings" },
];
