import { NavSections } from "@/components/sidebar/nav-sections";
import { SidebarFooter } from "@/components/sidebar/sidebar-footer";
import { SidebarSearch } from "@/components/sidebar/sidebar-search";
import { SocialLinks } from "@/components/sidebar/social-links";
import { Logo } from "@/components/ui/logo";

export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 z-40 hidden h-dvh w-(--sidebar-width) flex-col gap-4 border-border border-r bg-background-subtle md:flex">
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
