"use client";

import { IconPause } from "central-icons-outlined/IconPause";
import { IconPlay } from "central-icons-outlined/IconPlay";
import { IconSidebarHiddenRightWide } from "central-icons-outlined/IconSidebarHiddenRightWide";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { type CSSProperties, type ReactNode, useState } from "react";
import { getSpinner } from "@/components/spinners";
import { Button } from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";
import { CustomizePanel } from "./customize-panel";

const ICON_TRANSITION = {
  bounce: 0,
  duration: 0.3,
  type: "spring",
} as const;

const ICON_HIDDEN = { filter: "blur(4px)", opacity: 0, scale: 0.25 } as const;
const ICON_VISIBLE = { filter: "blur(0px)", opacity: 1, scale: 1 } as const;

const PANEL_TRANSITION = {
  bounce: 0,
  duration: 0.3,
  type: "spring",
} as const;

const CUSTOMIZE_PANEL_ID = "customize-panel";
const CUSTOMIZE_PANEL_WIDTH = 244;

function CustomizeDrawer({
  children,
  open,
  reduceMotion,
}: {
  children: ReactNode;
  open: boolean;
  reduceMotion: boolean;
}) {
  return (
    <m.div
      animate={{
        opacity: open ? 1 : 0,
        width: open ? CUSTOMIZE_PANEL_WIDTH : 0,
      }}
      aria-hidden={!open}
      className={cn(
        "shrink-0 overflow-hidden sm:h-full",
        "max-sm:grid max-sm:w-full! max-sm:transition-[grid-template-rows] max-sm:duration-300 max-sm:ease-out",
        open ? "max-sm:grid-rows-[1fr]" : "max-sm:grid-rows-[0fr]"
      )}
      id={CUSTOMIZE_PANEL_ID}
      inert={!open}
      initial={false}
      transition={reduceMotion ? { duration: 0 } : PANEL_TRANSITION}
    >
      <div className="min-h-0 overflow-hidden sm:h-full">{children}</div>
    </m.div>
  );
}

function findDefaultSizeIndex(sizes: { value: number }[]): number {
  const index = sizes.findIndex((size) => size.value === 20);
  return index === -1 ? Math.floor(sizes.length / 2) : index;
}

export function SpinnerPreview({ slug }: { slug: string }) {
  const shouldReduceMotion = useReducedMotion();
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
      className="flex w-full scroll-mt-[100px] flex-col rounded-2xl bg-gray-200 p-1 sm:h-[400px] sm:flex-row"
      id="preview"
    >
      <div className="relative flex min-h-64 min-w-0 flex-1 flex-col items-center gap-3 px-4 pt-13 pb-2">
        {customization && (
          <IconButton
            aria-controls={CUSTOMIZE_PANEL_ID}
            aria-expanded={customizeOpen}
            aria-label={
              customizeOpen ? "Hide customization" : "Show customization"
            }
            className="absolute top-2 right-2"
            onClick={() => setCustomizeOpen((value) => !value)}
            size="xxs"
            title={customizeOpen ? "Hide customization" : "Show customization"}
            type="button"
            variant="ghost"
          >
            <IconSidebarHiddenRightWide className="size-4" />
          </IconButton>
        )}
        <div className="flex min-h-0 flex-1 items-center justify-center">
          <div style={wrapperStyle}>
            <Spinner size={sizes?.[sizeIndex]?.value ?? 20} />
          </div>
        </div>
        <Button
          leftIcon={
            <AnimatePresence initial={false} mode="popLayout">
              <m.span
                animate={ICON_VISIBLE}
                aria-hidden="true"
                className="grid"
                exit={shouldReduceMotion ? ICON_VISIBLE : ICON_HIDDEN}
                initial={shouldReduceMotion ? false : ICON_HIDDEN}
                key={paused ? "play" : "pause"}
                transition={
                  shouldReduceMotion ? { duration: 0 } : ICON_TRANSITION
                }
              >
                {paused ? (
                  <IconPlay className="size-4" />
                ) : (
                  <IconPause className="size-4" />
                )}
              </m.span>
            </AnimatePresence>
          }
          onClick={() => setPaused((value) => !value)}
          size="xs"
          type="button"
          variant="ghost"
        >
          {paused ? "Play" : "Pause"}
        </Button>
      </div>
      {customization && (
        <CustomizeDrawer
          open={customizeOpen}
          reduceMotion={Boolean(shouldReduceMotion)}
        >
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
