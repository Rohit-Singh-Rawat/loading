"use client";

import { m } from "motion/react";
import { useId } from "react";
import { cn } from "@/lib/utils";

const INDICATOR_TRANSITION = {
  bounce: 0,
  duration: 0.3,
  type: "spring",
} as const;

export function SegmentedControl<Value extends string | number>({
  label,
  onValueChange,
  options,
  value,
}: {
  label: string;
  onValueChange: (value: Value) => void;
  options: readonly { label: string; value: Value }[];
  value: Value;
}) {
  const indicatorId = useId();

  return (
    <fieldset
      aria-label={label}
      className="flex h-8 w-full items-center rounded-lg bg-gray-200"
    >
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            aria-pressed={isActive}
            className={cn(
              "link-outline relative h-8 min-w-0 flex-1 rounded-lg font-medium text-sm transition-colors duration-200 ease-out",
              isActive
                ? "text-gray-1200"
                : "text-gray-1000 hover-hover:hover:text-gray-1200"
            )}
            key={option.value}
            onClick={() => onValueChange(option.value)}
            type="button"
          >
            {isActive && (
              <m.span
                className="pointer-events-none absolute inset-0 rounded-lg bg-gray-300"
                layoutId={`segmented-control-${indicatorId}`}
                transition={INDICATOR_TRANSITION}
              />
            )}
            <span className="relative z-10 select-none">{option.label}</span>
          </button>
        );
      })}
    </fieldset>
  );
}
