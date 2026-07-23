import Link from "next/link";
import { SidebarItem } from "@/components/sidebar/sidebar-item";
import { SPINNER_ITEMS } from "@/components/spinners";
import { Classic } from "@/components/spinners/classic/classic";

const MAIN_NAV = [
  { href: "/", label: "Overview" },
  { href: "/usage", label: "Usage" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/components", label: "Components" },
];

export function Sidebar() {
  return (
    <aside className="hidden w-[200px] shrink-0 flex-col gap-[30px] py-[100px] md:flex">
      <Link
        aria-label="Home"
        className="link-outline flex h-12 items-center self-start"
        href="/"
      >
        <Classic size={22} />
      </Link>
      <nav aria-label="Main" className="flex flex-col">
        {MAIN_NAV.map((item) => (
          <SidebarItem href={item.href} key={item.href} label={item.label} />
        ))}
      </nav>
      <nav aria-label="Spinners" className="flex flex-col">
        {SPINNER_ITEMS.map((item) => (
          <SidebarItem
            href={`/spinners/${item.slug}`}
            key={item.slug}
            label={item.name}
          />
        ))}
      </nav>
    </aside>
  );
}
