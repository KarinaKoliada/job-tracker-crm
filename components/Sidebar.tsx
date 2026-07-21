"use client";
import { navItems } from "@/config/navItems";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-44 border-r p-4 h-screen sticky top-0 flex flex-col ">
      <Link href="/" className="text-sm font-medium text-primary mb-6 block">
        ✦ JobTracker
      </Link>
      <nav className="flex flex-col gap-4 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              className={`
    flex items-center gap-2 p-2 rounded-md transition
    ${
      isActive
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:bg-muted"
    }
  `}
              href={item.href}
            >
              {Icon && <Icon size={18} />}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
