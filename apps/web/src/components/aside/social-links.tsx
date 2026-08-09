import { IconGithub } from "central-icons/IconGithub";
import { IconNpm } from "central-icons/IconNpm";
import { IconX } from "central-icons/IconX";
import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

const SOCIAL_LINKS: {
  href: string;
  icon: ComponentType<{ className?: string }>;
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
    <nav
      aria-label="Social"
      className={cn("flex items-center gap-0.5", className)}
    >
      {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
        <a
          aria-label={label}
          className="flex size-8 items-center justify-center rounded-lg text-gray-1000 transition-colors hover-hover:hover:bg-gray-300 hover-hover:hover:text-gray-1200"
          href={href}
          key={label}
          rel="noreferrer"
          target="_blank"
          title={label}
        >
          <Icon className="size-4" />
        </a>
      ))}
    </nav>
  );
}
