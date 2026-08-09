"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

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
  const isActive = pathname === href;

  return (
    <Text
      aria-current={isActive ? "page" : undefined}
      as={Link}
      className={cn(
        "link-outline relative flex h-8 w-full items-center gap-2 rounded-lg px-3 after:absolute after:inset-x-0 after:-inset-y-px after:content-['']",
        isActive
          ? "bg-gray-300 text-gray-1200"
          : "text-gray-1000 hover:bg-gray-300 hover:text-gray-1200"
      )}
      href={href}
      onClick={onNavigate}
      size="sm"
      weight="medium"
    >
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {pending && (
        <Text
          as="span"
          className="shrink-0 text-gray-1000"
          size="sm"
          weight="regular"
        >
          Soon
        </Text>
      )}
    </Text>
  );
}
