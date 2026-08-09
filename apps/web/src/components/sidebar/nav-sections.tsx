import { SidebarItem } from "@/components/sidebar/sidebar-item";
import { SPINNER_ITEMS } from "@/components/spinners";

const MAIN_NAV = [{ href: "/", label: "Overview" }];

export function NavSections({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <nav aria-label="Main" className="flex flex-col gap-0.5">
        {MAIN_NAV.map((item) => (
          <SidebarItem
            href={item.href}
            key={item.href}
            label={item.label}
            onNavigate={onNavigate}
          />
        ))}
      </nav>
      <nav aria-label="Spinners" className="flex flex-col gap-0.5">
        {SPINNER_ITEMS.map((item) => (
          <SidebarItem
            href={`/spinners/${item.slug}`}
            key={item.slug}
            label={item.name}
            onNavigate={onNavigate}
            pending={!item.component}
          />
        ))}
      </nav>
    </>
  );
}
