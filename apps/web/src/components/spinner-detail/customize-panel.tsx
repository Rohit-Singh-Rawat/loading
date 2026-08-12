"use client";

import { IconArrowRotateCounterClockwise } from "central-icons-outlined/IconArrowRotateCounterClockwise";
import type { SpinnerCustomization } from "@/components/spinners";
import { CardHeader } from "@/components/ui/card-header";
import IconButton from "@/components/ui/icon-button";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { cn } from "@/lib/utils";
import { ColorPickerRow } from "./color-picker-row";
import { SliderRow } from "./slider-row";
import type { SpinnerCustomizationState } from "./spinner-customization";

export function CustomizePanel({
  className,
  customization,
  state,
}: {
  className?: string;
  customization: SpinnerCustomization;
  state: SpinnerCustomizationState;
}) {
  const { sizes, speed } = customization;

  return (
    <div
      className={cn(
        "flex h-full w-full shrink-0 flex-col gap-2 rounded-xl bg-background-subtle p-2 sm:w-60",
        className
      )}
    >
      <CardHeader title="Customize">
        <IconButton
          aria-label="Reset customization"
          className="-mr-1"
          onClick={state.reset}
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
      <SegmentedControl
        label="Size"
        onValueChange={state.setSizeIndex}
        options={sizes.map((size, index) => ({
          label: size.label,
          value: index,
        }))}
        value={state.sizeIndex}
      />
      <ColorPickerRow color={state.color} onChange={state.setColor} />
      <SliderRow
        format={(value) => `${value}ms`}
        label="Speed"
        max={speed.max}
        min={speed.min}
        onChange={state.setSpeedMs}
        step={10}
        value={state.speedMs}
      />
      <SliderRow
        format={(value) => `${value}%`}
        label="Opacity"
        max={100}
        min={0}
        onChange={state.setOpacity}
        step={1}
        value={state.opacity}
      />
    </div>
  );
}
