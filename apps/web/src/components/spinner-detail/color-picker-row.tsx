"use client";

import type { ChangeEvent, KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

const MIN_OPACITY = 0;
const MAX_OPACITY = 100;

const FIELD =
  "flex h-8 pointer-coarse:h-10 items-center gap-2 rounded-lg bg-popover-hovered px-2 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-popover-content has-[input:focus-visible]:outline-offset-0";
const FIELD_INPUT =
  "min-w-0 flex-1 bg-transparent font-paper-mono text-[12px] text-popover-content outline-none";

export function ColorPickerRow({
  color,
  onChange,
  onOpacityChange,
  opacity,
}: {
  color: string | null;
  onChange: (color: string) => void;
  onOpacityChange: (percent: number) => void;
  opacity: number;
}) {
  const swatchRef = useRef<HTMLSpanElement>(null);
  const [inheritedColor, setInheritedColor] = useState<string | null>(null);
  const pickerColor = color ?? inheritedColor;

  useEffect(() => {
    const swatch = swatchRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    if (!(swatch && context)) {
      return;
    }

    const update = () => {
      context.fillStyle = getComputedStyle(swatch).color;
      context.fillRect(0, 0, 1, 1);
      const channels = context.getImageData(0, 0, 1, 1).data.slice(0, 3);
      setInheritedColor(
        `#${Array.from(channels, (channel) => channel.toString(16).padStart(2, "0")).join("")}`
      );
    };
    const theme = window.matchMedia("(prefers-color-scheme: dark)");
    update();
    theme.addEventListener("change", update);
    return () => theme.removeEventListener("change", update);
  }, []);
  const [opacityDraft, setOpacityDraft] = useState<string | null>(null);

  function commitOpacity() {
    if (opacityDraft === null) {
      return;
    }
    const parsed = Number.parseInt(opacityDraft, 10);
    if (!Number.isNaN(parsed)) {
      onOpacityChange(Math.min(Math.max(parsed, MIN_OPACITY), MAX_OPACITY));
    }
    setOpacityDraft(null);
  }

  return (
    <Popover>
      <PopoverTrigger className="group flex h-8 pointer-coarse:h-10 w-full shrink-0 items-center justify-between rounded-lg bg-background px-2 transition-colors duration-200 ease-out data-popup-open:inset-ring data-popup-open:inset-ring-border data-popup-open:bg-background-hovered">
        <Text
          as="span"
          className="select-none text-content-subtle transition-colors duration-150 hover-hover:group-hover:text-content group-data-popup-open:text-content"
          size="sm"
          weight="medium"
        >
          Color
        </Text>
        <span className="flex items-center gap-2">
          <span className="font-paper-mono text-[12px] text-content-subtle uppercase transition-colors duration-150 hover-hover:group-hover:text-content group-data-popup-open:text-content">
            {pickerColor}
          </span>
          <span
            aria-hidden="true"
            className="size-4 rounded-sm border border-border bg-current text-content"
            ref={swatchRef}
            style={color ? { backgroundColor: color } : undefined}
          />
        </span>
      </PopoverTrigger>
      {pickerColor !== null && (
        <PopoverContent
          align="end"
          aria-label="Choose a color"
          className="flex flex-col gap-2 rounded-2xl p-2 shadow-popover"
        >
          <HexColorPicker
            className="color-picker"
            color={pickerColor}
            onChange={onChange}
          />
          <div className="flex w-50 gap-2">
            <div className={cn(FIELD, "min-w-0 flex-1")}>
              <Text as="span" className="text-popover-content-subtle" size="sm">
                #
              </Text>
              <HexColorInput
                aria-label="Hex color"
                className={cn(FIELD_INPUT, "text-right uppercase")}
                color={pickerColor}
                onChange={onChange}
              />
            </div>
            <div className={cn(FIELD, "w-15.5")}>
              <input
                aria-label="Opacity"
                className={FIELD_INPUT}
                inputMode="numeric"
                onBlur={commitOpacity}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setOpacityDraft(
                    event.target.value.replace(/\D/g, "").slice(0, 3)
                  );
                }}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                  if (event.key === "Enter") {
                    event.currentTarget.blur();
                  }
                }}
                type="text"
                value={opacityDraft ?? String(opacity)}
              />
              <Text as="span" className="text-popover-content-subtle" size="sm">
                %
              </Text>
            </div>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
}
