"use client";

import { usePathname } from "next/navigation";
import { SPINNER_ITEMS } from "@/components/spinners";
import { NavItem } from "@/components/ui/nav-item";

const MAIN_NAV = [{ href: "/", label: "Overview" }];

export function NavSections({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <nav aria-label="Main" className="flex flex-col gap-0.5">
        {MAIN_NAV.map((item) => (
          <NavItem
            active={pathname === item.href}
            href={item.href}
            key={item.href}
            label={item.label}
            onClick={onNavigate}
          />
        ))}
      </nav>
      <nav aria-label="Spinners" className="flex flex-col gap-0.5">
        {SPINNER_ITEMS.map((item) => {
          const href = `/spinners/${item.slug}`;
          return (
            <NavItem
              active={pathname === href}
              href={href}
              key={item.slug}
              label={item.name}
              onClick={onNavigate}
              pending={!item.component}
            />
          );
        })}
      </nav>
    </>
  );
}
