import { NavSections } from "@/components/sidebar/nav-sections";
import { SidebarFooter } from "@/components/sidebar/sidebar-footer";
import { SidebarSearch } from "@/components/sidebar/sidebar-search";
import { SocialLinks } from "@/components/sidebar/social-links";
import { Logo } from "@/components/ui/logo";

export function Sidebar() {
  return (
    <nav
      aria-label="Main"
      className="fixed top-0 left-0 z-40 hidden h-dvh w-64 flex-col gap-7.5 border-border border-r p-4 md:flex"
    >
      <Logo className="ml-2" />
      <SidebarSearch />
      <div className="min-h-0 grow overflow-y-auto">
        <NavSections />
      </div>
      <SocialLinks />
      <SidebarFooter />
    </nav>
  );
}
