"use client";

import { IconPause } from "central-icons/IconPause";
import { IconPlay } from "central-icons/IconPlay";
import { IconSidebarHiddenRightWide } from "central-icons-outlined/IconSidebarHiddenRightWide";
import { type CSSProperties, type ReactNode, useState } from "react";
import { getSpinner } from "@/components/spinners";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import IconButton from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";
import { CustomizePanel } from "./customize-panel";

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

function findDefaultSizeIndex(sizes: { value: number }[]): number {
  const index = sizes.findIndex((size) => size.value === 20);
  return index === -1 ? Math.floor(sizes.length / 2) : index;
}

export function SpinnerPreview({ slug }: { slug: string }) {
  const item = getSpinner(slug);
  const customization = item?.customization;
  const sizes = customization?.sizes;
  const defaultSizeIndex = sizes ? findDefaultSizeIndex(sizes) : 0;
  const defaultSpeedMs = customization?.speed?.default ?? 0;

  const [paused, setPaused] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(true);
  const [sizeIndex, setSizeIndex] = useState(defaultSizeIndex);
  const [color, setColor] = useState<string | null>(null);
  const [speedMs, setSpeedMs] = useState(defaultSpeedMs);
  const [opacity, setOpacity] = useState(1);

  const Spinner = item?.component;
  if (!(item && Spinner)) {
    return null;
  }

  const wrapperStyle: CSSProperties = {
    "--ld-play-state": paused ? "paused" : "running",
    opacity,
  } as CSSProperties;
  if (color) {
    wrapperStyle.color = color;
  }
  if (customization?.speed) {
    (wrapperStyle as Record<string, string | number>)["--ld-duration"] =
      `${speedMs}ms`;
  }

  return (
    <section
      className="flex w-full scroll-mt-25 flex-col rounded-2xl border border-border bg-background p-1 sm:h-100 sm:flex-row"
      id="preview"
    >
      <div className="relative flex min-h-64 min-w-0 flex-1 flex-col items-center px-4 pt-13 pb-2">
        {customization && (
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
        )}
        <div className="flex min-h-0 w-full flex-1 items-center justify-center">
          <div style={wrapperStyle}>
            <Spinner size={sizes?.[sizeIndex]?.value ?? 20} />
          </div>
        </div>
        <IconButton
          aria-label={paused ? "Play animation" : "Pause animation"}
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
          size="sm"
          title={paused ? "Play animation" : "Pause animation"}
          type="button"
          variant="tertiary"
        >
          <AnimatedIcon
            active={paused}
            activeIcon={<IconPlay className="size-4.5" />}
            idleIcon={<IconPause className="size-4.5" />}
          />
        </IconButton>
      </div>
      {customization && (
        <CustomizeDrawer open={customizeOpen}>
          <CustomizePanel
            className="max-sm:mt-1 sm:ms-1"
            color={color}
            customization={customization}
            onColorChange={setColor}
            onOpacityChange={setOpacity}
            onReset={() => {
              setSizeIndex(defaultSizeIndex);
              setColor(null);
              setSpeedMs(defaultSpeedMs);
              setOpacity(1);
            }}
            onSizeChange={setSizeIndex}
            onSpeedChange={setSpeedMs}
            opacity={opacity}
            sizeIndex={sizeIndex}
            speedMs={speedMs}
          />
        </CustomizeDrawer>
      )}
    </section>
  );
}
