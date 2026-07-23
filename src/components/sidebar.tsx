"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SPINNER_ITEMS } from "@/components/spinners";
import { Classic } from "@/components/spinners/classic";
import { cn } from "@/lib/utils";

const MAIN_NAV = [
  { href: "/", label: "Overview" },
  { href: "/usage", label: "Usage" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/components", label: "Components" },
];

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      className={cn(
        "link-outline flex h-8 w-full items-center rounded-lg px-2 text-[13px] leading-5 transition-colors duration-150",
        isActive
          ? "bg-gray-100 font-[450] text-gray-1200"
          : "text-gray-1000 hover:text-gray-1200"
      )}
      href={href}
    >
      {label}
    </Link>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-[200px] shrink-0 flex-col gap-[30px] py-[100px] md:flex">
      <Link
        aria-label="Spinners home"
        className="link-outline flex h-12 items-center self-start"
        href="/"
      >
        <Classic size={22} />
      </Link>
      <nav aria-label="Main" className="flex flex-col">
        {MAIN_NAV.map((item) => (
          <NavItem href={item.href} key={item.href} label={item.label} />
        ))}
      </nav>
      <nav aria-label="Spinners" className="flex flex-col">
        {SPINNER_ITEMS.map((item) => (
          <NavItem
            href={`/spinners/${item.slug}`}
            key={item.slug}
            label={item.name}
          />
        ))}
      </nav>
    </aside>
  );
}
