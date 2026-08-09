import Link from "next/link";
import type { ElementType, MouseEventHandler } from "react";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

type NavItemKind = "anchor" | "route";

const kinds: Record<
  NavItemKind,
  { component: ElementType; current: "location" | "page" }
> = {
  anchor: { component: "a", current: "location" },
  route: { component: Link, current: "page" },
};

export function NavItem({
  active = false,
  href,
  kind = "route",
  label,
  onClick,
  pending,
}: {
  active?: boolean;
  href: string;
  kind?: NavItemKind;
  label: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  pending?: boolean;
}) {
  const { component: Component, current } = kinds[kind];

  return (
    <Text
      aria-current={active ? current : undefined}
      as={Component}
      className={cn(
        "link-outline relative flex h-8 w-full items-center gap-2 rounded-lg px-3 after:absolute after:inset-x-0 after:-inset-y-px after:content-['']",
        active
          ? "bg-gray-300 text-gray-1200"
          : "text-gray-1000 hover:bg-gray-300 hover:text-gray-1200"
      )}
      href={href}
      onClick={onClick}
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
