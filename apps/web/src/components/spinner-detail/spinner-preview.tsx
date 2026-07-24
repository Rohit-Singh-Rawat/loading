"use client";

import { IconPause } from "central-icons/IconPause";
import { IconPlay } from "central-icons/IconPlay";
import { type CSSProperties, useState } from "react";
import { getSpinner } from "@/components/spinners";
import { Text } from "@/components/ui/text";
import { CustomizePanel } from "./customize-panel";

function findDefaultSizeIndex(sizes: { value: number }[]): number {
  const index = sizes.findIndex((size) => size.value === 20);
  return index === -1 ? Math.floor(sizes.length / 2) : index;
}

export function SpinnerPreview({ slug }: { slug: string }) {
  const item = getSpinner(slug);
  const customization = item?.customization;
  const sizes = customization?.sizes;

  const [paused, setPaused] = useState(false);
  const [sizeIndex, setSizeIndex] = useState(
    sizes ? findDefaultSizeIndex(sizes) : 0
  );
  const [color, setColor] = useState<string | null>(null);
  const [speedMs, setSpeedMs] = useState(customization?.speed?.default ?? 0);
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
      <div className="relative flex min-w-0 flex-1 items-center justify-center rounded-2xl bg-preview-bg shadow-custom">
        <Text
          as="span"
          className="absolute top-3 left-4 select-none text-gray-1000"
          size="sm"
        >
          Preview
        </Text>
        <button
          className="link-outline absolute top-2 right-2 flex h-8 items-center gap-1 rounded-lg px-2 text-gray-1200 transition-colors duration-150 hover-hover:hover:bg-gray-200"
          onClick={() => setPaused((value) => !value)}
          type="button"
        >
          {paused ? (
            <IconPlay className="size-[15px] text-gray-1000" />
          ) : (
            <IconPause className="size-[15px] text-gray-1000" />
          )}
          <Text as="span" size="sm">
            {paused ? "Play" : "Pause"}
          </Text>
        </button>
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
