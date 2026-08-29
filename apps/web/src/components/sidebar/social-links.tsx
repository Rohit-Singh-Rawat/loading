import { IconGithub } from "central-icons/IconGithub";
import { IconNpm } from "central-icons/IconNpm";
import type { ComponentProps, ComponentType } from "react";
import { NavItem } from "@/components/ui/nav-item";

export const SOCIAL_LINKS: {
  href: string;
  icon: ComponentType<ComponentProps<typeof IconGithub>>;
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
];

export function SocialLinks() {
  return (
    <nav aria-label="Social" className="flex flex-col gap-0.5 p-4">
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
