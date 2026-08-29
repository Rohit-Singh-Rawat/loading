"use client";

import { IconStepBack } from "central-icons-outlined/IconStepBack";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { cn } from "@/lib/utils";
import { ColorPickerRow } from "./color-picker-row";
import { SliderRow } from "./slider-row";
import { useSpinnerCustomization } from "./spinner-customization";

export function CustomizePanel({ className }: { className?: string }) {
  const { item, state } = useSpinnerCustomization();
  const { sizes, speed } = item.customization;

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
      <div className="mt-auto flex justify-center">
        <button
          className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 font-medium text-content-subtle text-sm transition-[scale,background-color,color] duration-200 ease-out hover-hover:hover:bg-background-hovered hover-hover:hover:text-content active:scale-[0.97]"
          onClick={state.reset}
          type="button"
        >
          <IconStepBack className="size-4 shrink-0" />
          Reset
        </button>
      </div>
    </div>
  );
}
