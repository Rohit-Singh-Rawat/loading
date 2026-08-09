"use client";

import type { ChangeEvent, CSSProperties } from "react";
import { useRef, useState } from "react";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

const FOCUS_RING =
  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-content has-[:focus-visible]:outline-offset-2";
const HANDLE_INSET = 10;
const HANDLE_HALF_WIDTH = 2;

const FILL_TRANSFORM = "scaleX(calc(var(--slider-percent) / 100))";
const HANDLE_TRANSFORM =
  "translateX(clamp(2px, calc(var(--slider-percent) * 1% - 10px), calc(100% - 2px)))";

interface OverlapBounds {
  labelEnd: number;
  labelStart: number;
  trackWidth: number;
  valueEnd: number;
  valueStart: number;
}

export function SliderRow({
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
  const [isDragging, setIsDragging] = useState(false);
  const [isHandleOverText, setIsHandleOverText] = useState(false);
  const labelRef = useRef<HTMLSpanElement>(null);
  const overlapBoundsRef = useRef<OverlapBounds | null>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const percent = ((value - min) / (max - min)) * 100;
  let handleState = "scale-[0.8] opacity-0";

  if (isDragging) {
    handleState = isHandleOverText
      ? "scale-[0.92] opacity-55"
      : "scale-100 opacity-80";
  }

  function handleOverlapsText(nextValue: number, bounds: OverlapBounds) {
    const nextPercent = (nextValue - min) / (max - min);
    const handleCenter = Math.min(
      bounds.trackWidth - HANDLE_HALF_WIDTH,
      Math.max(
        HANDLE_HALF_WIDTH,
        bounds.trackWidth * nextPercent - HANDLE_INSET
      )
    );
    const handleStart = handleCenter - HANDLE_HALF_WIDTH;
    const handleEnd = handleCenter + HANDLE_HALF_WIDTH;

    return (
      (handleEnd >= bounds.labelStart && handleStart <= bounds.labelEnd) ||
      (handleEnd >= bounds.valueStart && handleStart <= bounds.valueEnd)
    );
  }

  function startDragging(input: HTMLInputElement) {
    const labelElement = labelRef.current;
    const valueLabel = valueRef.current;
    if (labelElement && valueLabel) {
      const trackRect = input.getBoundingClientRect();
      const labelRect = labelElement.getBoundingClientRect();
      const valueRect = valueLabel.getBoundingClientRect();
      const bounds = {
        labelEnd: labelRect.right - trackRect.left,
        labelStart: labelRect.left - trackRect.left,
        trackWidth: trackRect.width,
        valueEnd: valueRect.right - trackRect.left,
        valueStart: valueRect.left - trackRect.left,
      };
      overlapBoundsRef.current = bounds;
      setIsHandleOverText(handleOverlapsText(value, bounds));
    }
    setIsDragging(true);
  }

  function stopDragging() {
    setIsDragging(false);
    setIsHandleOverText(false);
    overlapBoundsRef.current = null;
  }

  return (
    <div
      className={cn("group relative rounded-lg", FOCUS_RING)}
      style={{ "--slider-percent": percent } as CSSProperties}
    >
      <div className="relative h-8 w-full overflow-hidden rounded-lg bg-background">
        <div
          className="absolute inset-0 origin-left bg-background-hovered transition-transform duration-100 ease-out will-change-transform motion-reduce:transition-none"
          style={{ transform: FILL_TRANSFORM }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full transition-transform duration-100 ease-out will-change-transform motion-reduce:transition-none"
          style={{ transform: HANDLE_TRANSFORM }}
        >
          <span
            className={cn(
              "absolute top-1/2 left-0 block h-4 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[opacity,scale,background-color] duration-300 ease-out motion-reduce:transition-none",
              isHandleOverText ? "bg-content-subtle/50" : "bg-content-subtle",
              handleState
            )}
          />
        </span>
        <span
          className="pointer-events-none absolute inset-y-0 left-2 z-20 flex items-center"
          ref={labelRef}
        >
          <Text
            as="span"
            className={cn(
              "select-none text-content-subtle transition-colors duration-150 hover-hover:group-hover:text-content",
              isDragging && "text-content"
            )}
            size="sm"
            weight="medium"
          >
            {label}
          </Text>
        </span>
        <span
          className={cn(
            "pointer-events-none absolute inset-y-0 right-2 z-20 flex select-none items-center font-berkeley-mono text-content-subtle text-sm transition-colors duration-200 ease-out hover-hover:group-hover:text-content",
            isDragging && "text-content"
          )}
          ref={valueRef}
        >
          {format(value)}
        </span>
      </div>
      <input
        aria-label={label}
        className="slider-thumb-target absolute inset-x-0 -inset-y-1 z-30 w-full cursor-ew-resize opacity-0"
        max={max}
        min={min}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const nextValue = Number(event.target.value);
          const bounds = overlapBoundsRef.current;
          if (bounds) {
            setIsHandleOverText(handleOverlapsText(nextValue, bounds));
          }
          onChange(nextValue);
        }}
        onPointerCancel={stopDragging}
        onPointerDown={(event) => startDragging(event.currentTarget)}
        onPointerUp={stopDragging}
        step={step}
        type="range"
        value={value}
      />
    </div>
  );
}
