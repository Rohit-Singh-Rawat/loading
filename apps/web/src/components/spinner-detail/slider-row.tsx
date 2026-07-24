"use client";

import { m, useReducedMotion } from "motion/react";
import type { ChangeEvent } from "react";
import { useRef, useState } from "react";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

const FOCUS_RING =
  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gray-1100 has-[:focus-visible]:outline-offset-2";
const HANDLE_INSET = 10;
const HANDLE_HALF_WIDTH = 2;

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
  const shouldReduceMotion = useReducedMotion();
  const labelRef = useRef<HTMLSpanElement>(null);
  const overlapBoundsRef = useRef<OverlapBounds | null>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const percent = ((value - min) / (max - min)) * 100;
  const dragTransition = shouldReduceMotion
    ? { duration: 0 }
    : { bounce: 0, duration: 0.1, type: "spring" as const };
  let handleOpacity = 0;
  let handleScale = 0.8;

  if (isDragging) {
    handleOpacity = 0.8;
    handleScale = 1;
  }

  if (isDragging && isHandleOverText) {
    handleOpacity = 0.55;
    handleScale = 0.92;
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
      className={cn(
        "group relative h-8 w-full overflow-hidden rounded-lg bg-gray-200",
        FOCUS_RING
      )}
    >
      <m.div
        animate={{ scaleX: percent / 100 }}
        className="absolute inset-0 origin-left bg-gray-400 will-change-transform"
        initial={false}
        transition={dragTransition}
      />
      <m.span
        animate={{
          left: `clamp(2px, calc(${percent}% - ${HANDLE_INSET}px), calc(100% - 2px))`,
        }}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 z-10 h-4 w-[3px] -translate-x-1/2 -translate-y-1/2"
        initial={false}
        transition={dragTransition}
      >
        <m.span
          animate={{
            opacity: handleOpacity,
            scale: handleScale,
          }}
          className={cn(
            "block size-full rounded-full transition-colors duration-200 ease-out will-change-transform",
            isHandleOverText ? "bg-gray-500" : "bg-gray-700"
          )}
          initial={false}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { bounce: 0, duration: 0.3, type: "spring" }
          }
        />
      </m.span>
      <span
        className="pointer-events-none absolute inset-y-0 left-2 z-20 flex items-center"
        ref={labelRef}
      >
        <Text
          as="span"
          className={cn(
            "select-none text-gray-1000 transition-colors duration-150 hover-hover:group-hover:text-gray-1200",
            isDragging && "text-gray-1200"
          )}
          size="sm"
          weight="medium"
        >
          {label}
        </Text>
      </span>
      <input
        aria-label={label}
        className="absolute inset-0 size-full cursor-ew-resize opacity-0"
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
      <span
        className={cn(
          "pointer-events-none absolute inset-y-0 right-2 z-20 flex select-none items-center font-berkeley-mono text-[13px] text-gray-1000 transition-colors duration-150 hover-hover:group-hover:text-gray-1200",
          isDragging && "text-gray-1200"
        )}
        ref={valueRef}
      >
        {format(value)}
      </span>
    </div>
  );
}
