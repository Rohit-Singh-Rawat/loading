"use client";

import { ResetIcon } from "@radix-ui/react-icons";
import { SIZES, type SpinnerItem } from "@/components/spinners";
import { Button } from "@/components/ui/button";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { cn } from "@/lib/utils";
import { ColorPickerRow } from "./color-picker-row";
import { SliderRow } from "./slider-row";
import type { SpinnerCustomizationState } from "./spinner-customization";

export function CustomizePanel({
  className,
  item,
  state,
}: {
  className?: string;
  item: SpinnerItem;
  state: SpinnerCustomizationState;
}) {
  const mirror = (ms: number) => item.speed.max + item.speed.min - ms;

  return (
    <div
      className={cn(
        "flex h-full w-full shrink-0 flex-col gap-2 rounded-xl bg-background p-2 sm:w-60",
        className
      )}
    >
      <SegmentedControl
        label="Size"
        onValueChange={state.setSize}
        options={SIZES}
        value={state.size}
      />
      {item.options?.map((option) => (
        <SegmentedControl
          key={option.prop}
          label={option.label}
          onValueChange={(value) => state.setOption(option.prop, value)}
          options={option.values}
          value={state.options[option.prop] ?? option.defaultValue}
        />
      ))}
      <ColorPickerRow
        color={state.color}
        onChange={state.setColor}
        onOpacityChange={state.setOpacity}
        opacity={state.opacity}
      />
      <SliderRow
        format={(value) => `${mirror(value)}ms`}
        label="Speed"
        max={item.speed.max}
        min={item.speed.min}
        onChange={(value) => state.setSpeedMs(mirror(value))}
        step={10}
        value={mirror(state.speedMs)}
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
          <ResetIcon className="size-4 shrink-0" />
          Reset
        </Button>
      </div>
    </div>
  );
}
