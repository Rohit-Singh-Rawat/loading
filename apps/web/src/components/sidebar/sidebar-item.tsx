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
        "link-outline relative flex h-8 w-full items-center rounded-lg px-3 before:absolute before:inset-x-0 before:-inset-y-px before:content-['']",
        isActive
          ? "bg-gray-300 text-gray-1200"
          : "text-gray-1000 hover:bg-gray-300 hover:text-gray-1200"
      )}
      href={href}
      size="sm"
      weight="medium"
    >
      {label}
    </Text>
  );
}
