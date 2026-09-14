import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { IconNpm } from "central-icons/IconNpm";
import type { ComponentType } from "react";
import { NavItem } from "@/components/ui/nav-item";

export const SOCIAL_LINKS: {
  href: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
}[] = [
  {
    href: "https://github.com/jakubkrehel/loading",
    icon: GitHubLogoIcon,
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
    <nav aria-label="Social" className="flex flex-col gap-0.5 px-4 pb-4">
      {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
        <NavItem
          href={href}
          icon={<Icon className="size-4 shrink-0" />}
          key={label}
          kind="external"
          label={label}
        />
      ))}
    </nav>
  );
}
