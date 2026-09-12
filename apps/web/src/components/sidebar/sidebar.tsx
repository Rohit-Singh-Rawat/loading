import { NavSections } from "@/components/sidebar/nav-sections";
import { SidebarFooter } from "@/components/sidebar/sidebar-footer";
import { SidebarSearch } from "@/components/sidebar/sidebar-search";
import { SocialLinks } from "@/components/sidebar/social-links";
import { Logo } from "@/components/ui/logo";

export function Sidebar() {
  return (
    <aside className="fixed inset-y-(--sidebar-inset) left-(--sidebar-inset) z-40 hidden w-(--sidebar-width) flex-col gap-4 rounded-2xl bg-background-subtle md:flex">
      <div className="px-7 pt-6 pb-2">
        <Logo />
      </div>
      <div className="px-4">
        <SidebarSearch />
      </div>
      <div className="min-h-0 grow overflow-y-auto">
        <NavSections />
      </div>
      <div className="flex flex-col">
        <SocialLinks />
        <SidebarFooter />
      </div>
    </aside>
  );
}
