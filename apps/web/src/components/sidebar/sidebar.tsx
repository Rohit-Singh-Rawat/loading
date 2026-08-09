import Link from "next/link";
import { NavSections } from "@/components/sidebar/nav-sections";
import { SidebarSearch } from "@/components/sidebar/sidebar-search";

export function Sidebar() {
  return (
    <aside className="hidden w-50 shrink-0 flex-col gap-7.5 py-25 md:flex">
      <Link
        aria-label="Home"
        className="ml-2 flex size-8 items-center justify-center rounded-full bg-[#EF551A]"
        href="/"
      />
      <SidebarSearch />
      <NavSections />
    </aside>
  );
}
