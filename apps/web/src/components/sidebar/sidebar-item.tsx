"use client";

import { usePathname } from "next/navigation";
import { NavItem } from "@/components/ui/nav-item";

export function SidebarItem({
  href,
  label,
  onNavigate,
  pending,
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
  pending?: boolean;
}) {
  const pathname = usePathname();

  return (
    <NavItem
      active={pathname === href}
      href={href}
      label={label}
      onClick={onNavigate}
      pending={pending}
    />
  );
}
