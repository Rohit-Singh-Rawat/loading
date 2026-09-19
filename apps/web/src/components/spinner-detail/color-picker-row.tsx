"use client";

import { useRef } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Text } from "@/components/ui/text";
import { useInheritedColor } from "@/lib/use-inherited-color";
import { cn } from "@/lib/utils";
import { PercentInput } from "./percent-input";

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
  const inheritedColor = useInheritedColor(swatchRef);
  const pickerColor = color ?? inheritedColor;

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
              <PercentInput
                className={FIELD_INPUT}
                label="Opacity"
                onChange={onOpacityChange}
                value={opacity}
              />
            </div>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
}
