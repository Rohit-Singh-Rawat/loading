import { IconMagnifyingGlass } from "central-icons/IconMagnifyingGlass";
import { Text } from "@/components/ui/text";

export function SidebarSearch() {
  return (
    <div className="flex h-8 w-full items-center gap-2 rounded-lg border border-gray-400 bg-gray-300 px-2 focus-within:outline-2 focus-within:outline-gray-900 focus-within:outline-offset-2">
      <IconMagnifyingGlass
        aria-hidden="true"
        className="size-4 shrink-0 text-gray-1000"
      />
      <Text
        aria-label="Search spinners"
        as="input"
        className="w-full min-w-0 bg-transparent text-gray-1200 outline-none placeholder:text-gray-1000"
        placeholder="Search"
        size="sm"
        type="search"
      />
    </div>
  );
}
