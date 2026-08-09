"use client";

import { IconArrowRotateCounterClockwise } from "central-icons-outlined/IconArrowRotateCounterClockwise";
import type { SpinnerCustomization } from "@/components/spinners";
import { CardHeader } from "@/components/ui/card-header";
import IconButton from "@/components/ui/icon-button";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { cn } from "@/lib/utils";
import { ColorPickerRow } from "./color-picker-row";
import { SliderRow } from "./slider-row";

export function CustomizePanel({
  className,
  color,
  customization,
  onColorChange,
  onOpacityChange,
  onReset,
  onSizeChange,
  onSpeedChange,
  opacity,
  sizeIndex,
  speedMs,
}: {
  className?: string;
  color: string | null;
  customization: SpinnerCustomization;
  onColorChange: (color: string) => void;
  onOpacityChange: (opacity: number) => void;
  onReset: () => void;
  onSizeChange: (index: number) => void;
  onSpeedChange: (speedMs: number) => void;
  opacity: number;
  sizeIndex: number;
  speedMs: number;
}) {
  const { opacity: hasOpacity, color: hasColor, sizes, speed } = customization;

  return (
    <div
      className={cn(
        // Popover, not another translucent fill. The fills composite, so a
        // third layer (panel inside the preview, rows inside the panel) pushed
        // Content/Subtle under 4.5:1. An opaque surface resets the stack, and
        // Popover is the elevated one in both appearances.
        "flex h-full w-full shrink-0 flex-col gap-2 rounded-xl bg-popover p-2 sm:w-60",
        className
      )}
    >
      <CardHeader title="Customize">
        <IconButton
          aria-label="Reset customization"
          className="-mr-1"
          onClick={onReset}
          size="xs"
          title="Reset customization"
          type="button"
          variant="tertiary"
        >
          <span className="grid transition-transform duration-150 ease-in-out group-active:-rotate-45">
            <IconArrowRotateCounterClockwise className="size-4" />
          </span>
        </IconButton>
      </CardHeader>
      {sizes && (
        <SegmentedControl
          label="Size"
          onValueChange={onSizeChange}
          options={sizes.map((size, index) => ({
            label: size.label,
            value: index,
          }))}
          value={sizeIndex}
        />
      )}
      {hasColor && <ColorPickerRow color={color} onChange={onColorChange} />}
      {speed && (
        <SliderRow
          format={(value) => `${value}`}
          label="Speed"
          max={speed.max}
          min={speed.min}
          onChange={onSpeedChange}
          step={10}
          value={speedMs}
        />
      )}
      {hasOpacity && (
        <SliderRow
          format={(value) => `${value}%`}
          label="Opacity"
          max={100}
          min={0}
          onChange={(value) => onOpacityChange(value / 100)}
          step={1}
          value={Math.round(opacity * 100)}
        />
      )}
    </div>
  );
}
