"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

export function SidebarItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Text
      as={Link}
      className={cn(
        "link-outline flex h-8 w-full items-center rounded-lg px-2 transition-colors duration-150",
        isActive
          ? "bg-gray-100 text-gray-1200"
          : "text-gray-1000 hover:text-gray-1200"
      )}
      href={href}
      size="sm"
      weight={isActive ? "semimedium" : "regular"}
    >
      {label}
    </Text>
  );
}
