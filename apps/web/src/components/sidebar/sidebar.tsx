import { ScrollArea } from "@base-ui/react/scroll-area";
import { NavSections } from "@/components/sidebar/nav-sections";
import { SidebarFooter } from "@/components/sidebar/sidebar-footer";
import { SidebarSearch } from "@/components/sidebar/sidebar-search";
import { SocialLinks } from "@/components/sidebar/social-links";
import { Logo } from "@/components/ui/logo";

export function Sidebar() {
  return (
    <aside className="fixed inset-y-(--sidebar-inset) left-(--sidebar-inset) z-40 hidden w-(--sidebar-width) flex-col gap-6 rounded-2xl bg-background-subtle md:flex">
      <div className="px-6 pt-6 pb-2">
        <Logo />
      </div>
      <div className="px-4">
        <SidebarSearch />
      </div>
      <ScrollArea.Root className="flex min-h-0 grow flex-col">
        <ScrollArea.Viewport className="scroll-fade-y min-h-0 grow">
          <NavSections />
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="my-1 me-px w-1.5 opacity-0 transition-opacity duration-100 ease-out data-hovering:opacity-100 data-scrolling:opacity-100"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="w-full rounded-full bg-content-subtle/40" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
      <div className="flex flex-col">
        <SocialLinks />
        <SidebarFooter />
      </div>
    </aside>
  );
}
