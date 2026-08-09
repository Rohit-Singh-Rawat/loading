import { IconGithub } from "central-icons/IconGithub";
import { IconNpm } from "central-icons/IconNpm";
import { IconX } from "central-icons/IconX";
import type { ComponentProps, ComponentType } from "react";
import { NavItem } from "@/components/ui/nav-item";
import { cn } from "@/lib/utils";

type SocialIcon = ComponentType<
  ComponentProps<"svg"> & { mode?: "masked" | "raw" }
>;

export const SOCIAL_LINKS: {
  href: string;
  icon: SocialIcon;
  label: string;
}[] = [
  {
    href: "https://github.com/jakubkrehel/loading",
    icon: IconGithub,
    label: "GitHub",
  },
  {
    href: "https://www.npmjs.com/package/loading-dev",
    icon: IconNpm,
    label: "npm",
  },
  {
    href: "https://x.com/jakubkrehel",
    icon: IconX,
    label: "X",
  },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <nav aria-label="Social" className={cn("flex flex-col gap-0.5", className)}>
      {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
        <NavItem
          href={href}
          icon={<Icon className="size-4 shrink-0" mode="raw" />}
          key={label}
          kind="external"
          label={label}
        />
      ))}
    </nav>
  );
}
