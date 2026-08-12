"use client";

import { IconPause } from "central-icons/IconPause";
import { IconPlay } from "central-icons/IconPlay";
import { IconSidebarHiddenRightWide } from "central-icons-outlined/IconSidebarHiddenRightWide";
import { type ReactNode, useState } from "react";
import { getSpinner, type SpinnerItem } from "@/components/spinners";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import IconButton from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";
import { CustomizePanel } from "./customize-panel";
import { useSpinnerCustomization } from "./use-spinner-customization";

const CUSTOMIZE_PANEL_ID = "customize-panel";

function CustomizeDrawer({
  children,
  open,
}: {
  children: ReactNode;
  open: boolean;
}) {
  return (
    <div
      className={cn(
        "shrink-0 overflow-hidden transition-[width,opacity,visibility] duration-300 ease-out max-sm:w-full sm:h-full",
        open ? "sm:w-61 sm:opacity-100" : "sm:invisible sm:w-0 sm:opacity-0"
      )}
      id={CUSTOMIZE_PANEL_ID}
    >
      {children}
    </div>
  );
}

export function SpinnerPreview({ slug }: { slug: string }) {
  const item = getSpinner(slug);
  if (!item) {
    throw new Error(`No spinner registered for slug "${slug}"`);
  }

  return <Preview item={item} />;
}

function Preview({ item }: { item: SpinnerItem }) {
  const [customizeOpen, setCustomizeOpen] = useState(true);
  const state = useSpinnerCustomization(item);
  const Spinner = item.component;

  return (
    <section
      className="flex w-full scroll-mt-25 flex-col rounded-2xl border border-border bg-background p-1 sm:h-100 sm:flex-row"
      id="preview"
    >
      <div className="relative flex min-h-64 min-w-0 flex-1 flex-col items-center px-4 pt-13 pb-2">
        <IconButton
          aria-controls={CUSTOMIZE_PANEL_ID}
          aria-expanded={customizeOpen}
          aria-label={
            customizeOpen ? "Hide customization" : "Show customization"
          }
          className="absolute top-2 right-2 max-sm:hidden"
          onClick={() => setCustomizeOpen((value) => !value)}
          size="xs"
          title={customizeOpen ? "Hide customization" : "Show customization"}
          type="button"
          variant="tertiary"
        >
          <IconSidebarHiddenRightWide className="size-4.5" />
        </IconButton>
        <div className="flex min-h-0 w-full flex-1 items-center justify-center">
          <div style={state.previewStyle}>
            <Spinner size={state.size} />
          </div>
        </div>
        <IconButton
          aria-label={state.paused ? "Play animation" : "Pause animation"}
          aria-pressed={state.paused}
          onClick={state.togglePaused}
          size="sm"
          title={state.paused ? "Play animation" : "Pause animation"}
          type="button"
          variant="tertiary"
        >
          <AnimatedIcon
            active={state.paused}
            activeIcon={<IconPlay className="size-4.5" />}
            idleIcon={<IconPause className="size-4.5" />}
          />
        </IconButton>
      </div>
      <CustomizeDrawer open={customizeOpen}>
        <CustomizePanel
          className="max-sm:mt-1 sm:ms-1"
          customization={item.customization}
          state={state}
        />
      </CustomizeDrawer>
    </section>
  );
}
