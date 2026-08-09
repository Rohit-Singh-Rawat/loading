"use client";

import { Dialog } from "@base-ui/react/dialog";
import { IconBarsThree } from "central-icons-outlined/IconBarsThree";
import { IconCrossMedium } from "central-icons-outlined/IconCrossMedium";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SocialLinks } from "@/components/aside/social-links";
import { NavSections } from "@/components/sidebar/nav-sections";
import IconButton from "@/components/ui/icon-button";
import { Logo } from "@/components/ui/logo";
import { Text } from "@/components/ui/text";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-2 border-gray-300 border-b bg-gray-background px-6 md:hidden">
        <Logo />
        <Dialog.Trigger
          render={
            <IconButton aria-label="Open navigation" size="xs" variant="ghost">
              <IconBarsThree className="size-4" />
            </IconButton>
          }
        />
      </header>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/25 transition-opacity duration-200 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col gap-6 overflow-y-auto bg-gray-background p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-custom outline-hidden transition-transform duration-200 ease-out data-ending-style:-translate-x-full data-starting-style:-translate-x-full">
          <div className="flex items-center justify-between gap-2">
            <Dialog.Title
              render={
                <Text as="h2" size="sm" weight="semibold">
                  Navigation
                </Text>
              }
            />
            <Dialog.Close
              render={
                <IconButton
                  aria-label="Close navigation"
                  className="-mr-1"
                  size="xs"
                  variant="ghost"
                >
                  <IconCrossMedium className="size-4" />
                </IconButton>
              }
            />
          </div>
          <NavSections onNavigate={() => setOpen(false)} />
          <SocialLinks className="mt-auto -ml-2 pt-2" />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
