import Link from "next/link";
import { SidebarItem } from "@/components/sidebar/sidebar-item";
import { SidebarSearch } from "@/components/sidebar/sidebar-search";
import { SPINNER_ITEMS } from "@/components/spinners";

const MAIN_NAV = [{ href: "/", label: "Overview" }];

export function Sidebar() {
  return (
    <aside className="hidden w-50 shrink-0 flex-col gap-7.5 py-25 md:flex">
      <Link
        aria-label="Home"
        className="rounded-full ml-2 flex rounded-full size-8  bg-[#EF551A] items-center justify-center"
        href="/"
      />
        
      <SidebarSearch />
      <nav aria-label="Main" className="flex flex-col gap-0.5">
        {MAIN_NAV.map((item) => (
          <SidebarItem href={item.href} key={item.href} label={item.label} />
        ))}
      </nav>
      <nav aria-label="Spinners" className="flex flex-col gap-0.5">
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
