import Link from "next/link";
import type { ElementType, ReactNode } from "react";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

type NavItemKind = "external" | "route";

const kinds: Record<
  NavItemKind,
  { component: ElementType; props?: Record<string, string> }
> = {
  external: { component: "a", props: { rel: "noreferrer", target: "_blank" } },
  route: { component: Link },
};

export function NavItem({
  active = false,
  href,
  icon,
  kind = "route",
  label,
}: {
  active?: boolean;
  href: string;
  icon?: ReactNode;
  kind?: NavItemKind;
  label: string;
}) {
  const { component: Component, props } = kinds[kind];

  return (
    <Text
      aria-current={active ? "page" : undefined}
      as={Component}
      className={cn(
        "relative flex h-8 w-full items-center gap-2 rounded-lg px-3 after:absolute after:inset-x-0 after:-inset-y-px after:content-['']",
        active
          ? "bg-background text-content"
          : "text-content-subtle hover:bg-background hover:text-content"
      )}
      href={href}
      size="sm"
      weight="semimedium"
      {...props}
    >
      {icon}
      <span className="min-w-0 flex-1 truncate">{label}</span>
    </Text>
  );
}
