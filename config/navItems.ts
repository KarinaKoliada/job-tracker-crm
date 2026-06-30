import { NavItem } from "@/types/navigation";
import { LayoutDashboard, LucideList, LucideSettings, LucideWorm } from "lucide-react";

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/applications", label: "Applications", icon: LucideList },
  { href: "/settings", label: "Settings", icon: LucideSettings },
    { href: "/analytics", label: "Analytics", icon: LucideWorm },
];
