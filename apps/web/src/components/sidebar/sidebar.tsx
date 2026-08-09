import { NavSections } from "@/components/sidebar/nav-sections";
import { SidebarSearch } from "@/components/sidebar/sidebar-search";
import { Logo } from "@/components/ui/logo";

export function Sidebar() {
  return (
    <aside className="hidden w-50 shrink-0 flex-col gap-7.5 py-25 md:flex">
      <Logo className="ml-2" />
      <SidebarSearch />
      <NavSections />
    </aside>
  );
}
