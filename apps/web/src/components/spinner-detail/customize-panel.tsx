"use client";

import { IconStepBack } from "central-icons-outlined/IconStepBack";
import { SIZES, type SpinnerItem } from "@/components/spinners";
import { Button } from "@/components/ui/button";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { cn } from "@/lib/utils";
import { ColorPickerRow } from "./color-picker-row";
import { SliderRow } from "./slider-row";
import type { SpinnerCustomizationState } from "./spinner-customization";

export function CustomizePanel({
  className,
  speed,
  state,
}: {
  className?: string;
  speed: SpinnerItem["speed"];
  state: SpinnerCustomizationState;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full shrink-0 flex-col gap-2 rounded-xl bg-background p-2 sm:w-60",
        className
      )}
    >
      <SegmentedControl
        label="Size"
        onValueChange={state.setSizeIndex}
        options={SIZES.map((size, index) => ({
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
      <div className="mt-auto flex justify-center">
        <Button onClick={state.reset} type="button" variant="ghost">
          <IconStepBack className="size-4 shrink-0" />
          Reset
        </Button>
      </div>
    </div>
  );
}
