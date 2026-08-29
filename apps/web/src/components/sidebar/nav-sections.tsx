"use client";

import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/components/sidebar/nav-items";
import { NavItem } from "@/components/ui/nav-item";

export function NavSections({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-0.5 px-4">
      {NAV_ITEMS.map((item) => (
        <NavItem
          active={pathname === item.href}
          href={item.href}
          key={item.href}
          label={item.label}
          onClick={onNavigate}
        />
      ))}
    </div>
  );
}
