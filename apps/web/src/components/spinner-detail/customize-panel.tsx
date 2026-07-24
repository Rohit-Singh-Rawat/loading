"use client";

import type { ChangeEvent } from "react";
import type { SpinnerCustomization } from "@/components/spinners";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

const FOCUS_RING =
  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gray-1100 has-[:focus-visible]:outline-offset-2";

function formatOpacity(value: number): string {
  return value === 1 ? "1" : value.toFixed(1).replace("0.", ".");
}

function SliderRow({
  format,
  label,
  max,
  min,
  onChange,
  step,
  value,
}: {
  format: (value: number) => string;
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
}) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div
      className={cn(
        "relative h-8 w-full overflow-hidden rounded-lg bg-gray-200",
        FOCUS_RING
      )}
    >
      <div
        className="absolute inset-y-0 left-0 bg-gray-300"
        style={{ width: `${percent}%` }}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
        <Text as="span" className="select-none text-gray-1000" size="sm">
          {label}
        </Text>
        <span className="font-berkeley-mono text-[13px] text-gray-1000">
          {format(value)}
        </span>
      </div>
      <input
        aria-label={label}
        className="absolute inset-0 size-full cursor-ew-resize opacity-0"
        max={max}
        min={min}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(Number(event.target.value))
        }
        step={step}
        type="range"
        value={value}
      />
    </div>
  );
}

export function CustomizePanel({
  color,
  customization,
  onColorChange,
  onOpacityChange,
  onSizeChange,
  onSpeedChange,
  opacity,
  sizeIndex,
  speedMs,
}: {
  color: string | null;
  customization: SpinnerCustomization;
  onColorChange: (color: string) => void;
  onOpacityChange: (opacity: number) => void;
  onSizeChange: (index: number) => void;
  onSpeedChange: (speedMs: number) => void;
  opacity: number;
  sizeIndex: number;
  speedMs: number;
}) {
  const { opacity: hasOpacity, color: hasColor, sizes, speed } = customization;

  return (
    <div className="flex h-full w-60 shrink-0 flex-col gap-2 rounded-2xl bg-preview-bg p-2 shadow-custom">
      <div className="flex items-center px-2 py-1">
        <Text as="span" className="select-none text-gray-1000" size="sm">
          Customize
        </Text>
      </div>
      {sizes && (
        <fieldset
          aria-label="Size"
          className="flex h-8 w-full items-center rounded-lg bg-gray-200"
        >
          {sizes.map((size, index) => (
            <div className="contents" key={size.label}>
              {index > 0 && (
                <span
                  className={cn(
                    "h-3 w-px shrink-0 bg-gray-400",
                    (index === sizeIndex || index - 1 === sizeIndex) &&
                      "invisible"
                  )}
                />
              )}
              <button
                aria-pressed={index === sizeIndex}
                className={cn(
                  "link-outline h-8 min-w-0 flex-1 rounded-lg text-sm transition-colors duration-150",
                  index === sizeIndex
                    ? "bg-gray-300 text-gray-1200"
                    : "text-gray-1000 hover-hover:hover:text-gray-1200"
                )}
                onClick={() => onSizeChange(index)}
                type="button"
              >
                {size.label}
              </button>
            </div>
          ))}
        </fieldset>
      )}
      {hasColor && (
        <label
          className={cn(
            "relative flex h-8 w-full shrink-0 cursor-pointer items-center justify-between rounded-lg bg-gray-200 px-2",
            FOCUS_RING
          )}
        >
          <Text as="span" className="select-none text-gray-1000" size="sm">
            Color
          </Text>
          <span className="flex items-center gap-2">
            <span className="font-berkeley-mono text-[13px] text-gray-1000 uppercase">
              {color ?? "Auto"}
            </span>
            <span
              className="size-4 rounded-[4px] border border-preview-border bg-current text-gray-1200"
              style={color ? { backgroundColor: color } : undefined}
            />
          </span>
          <input
            aria-label="Color"
            className="absolute inset-0 size-full cursor-pointer opacity-0"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onColorChange(event.target.value)
            }
            type="color"
            value={color ?? "#888888"}
          />
        </label>
      )}
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
          format={formatOpacity}
          label="Opacity"
          max={1}
          min={0.1}
          onChange={onOpacityChange}
          step={0.1}
          value={opacity}
        />
      )}
    </div>
  );
}
