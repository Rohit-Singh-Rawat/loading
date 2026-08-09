"use client";

import { IconPause } from "central-icons/IconPause";
import { IconPlay } from "central-icons/IconPlay";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { type CSSProperties, useState } from "react";
import { getSpinner } from "@/components/spinners";
import { CardHeader } from "@/components/ui/card-header";
import IconButton from "@/components/ui/icon-button";
import { CustomizePanel } from "./customize-panel";

const ICON_TRANSITION = {
  bounce: 0,
  duration: 0.18,
  type: "spring",
} as const;

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
      className="flex h-[400px] w-full scroll-mt-[100px] gap-1"
      id="preview"
    >
      <div className="relative flex min-w-0 flex-1 items-center justify-center rounded-2xl bg-gray-200">
        <CardHeader className="absolute inset-x-2 top-2" title="Preview">
          <IconButton
            aria-label={paused ? "Play preview" : "Pause preview"}
            onClick={() => setPaused((value) => !value)}
            size="xxs"
            title={paused ? "Play preview" : "Pause preview"}
            type="button"
            variant="ghost"
          >
            <AnimatePresence initial={false} mode="popLayout">
              <m.span
                animate={{ opacity: 1, scale: 1 }}
                aria-hidden="true"
                className="grid"
                exit={
                  shouldReduceMotion
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.75 }
                }
                initial={
                  shouldReduceMotion ? false : { opacity: 0, scale: 0.75 }
                }
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
          </IconButton>
        </CardHeader>
        <div style={wrapperStyle}>
          <Spinner size={sizes?.[sizeIndex]?.value ?? 20} />
        </div>
      </div>
      {customization && (
        <>
          <div className="h-3 w-[1.5px] shrink-0 self-center rounded-full bg-gray-500" />
          <CustomizePanel
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
        </>
      )}
    </section>
  );
}
