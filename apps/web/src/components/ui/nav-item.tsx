import Link from "next/link";
import type { ElementType, MouseEventHandler, ReactNode } from "react";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

type NavItemKind = "anchor" | "external" | "route";

const kinds: Record<
  NavItemKind,
  {
    component: ElementType;
    current: "location" | "page";
    props?: Record<string, string>;
  }
> = {
  anchor: { component: "a", current: "location" },
  external: {
    component: "a",
    current: "page",
    props: { rel: "noreferrer", target: "_blank" },
  },
  route: { component: Link, current: "page" },
};

export function NavItem({
  active = false,
  href,
  icon,
  kind = "route",
  label,
  onClick,
}: {
  active?: boolean;
  href: string;
  icon?: ReactNode;
  kind?: NavItemKind;
  label: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const { component: Component, current, props } = kinds[kind];

  return (
    <Text
      aria-current={active ? current : undefined}
      as={Component}
      className={cn(
        "link-outline relative flex h-8 w-full items-center gap-2 rounded-lg px-3 after:absolute after:inset-x-0 after:-inset-y-px after:content-['']",
        active
          ? "bg-background text-content"
          : "text-content-subtle hover:bg-background hover:text-content"
      )}
      href={href}
      onClick={onClick}
      size="sm"
      weight="medium"
      {...props}
    >
      {icon}
      <span className="min-w-0 flex-1 truncate">{label}</span>
    </Text>
  );
}
