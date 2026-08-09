"use client";

import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Text } from "@/components/ui/text";

const DEFAULT_COLOR = "#888888";

export function ColorPickerRow({
  color,
  onChange,
}: {
  color: string | null;
  onChange: (color: string) => void;
}) {
  const pickerColor = color ?? DEFAULT_COLOR;

  return (
    <Popover>
      <PopoverTrigger
        aria-label={`Color: ${color ?? "Auto"}`}
        className="link-outline flex h-8 w-full shrink-0 items-center justify-between rounded-lg bg-background px-2"
      >
        <Text
          as="span"
          className="select-none text-content-subtle"
          size="sm"
          weight="medium"
        >
          Color
        </Text>
        <span className="flex items-center gap-2">
          <span className="font-berkeley-mono text-content-subtle text-sm uppercase">
            {color ?? "Auto"}
          </span>
          <span
            aria-hidden="true"
            className="size-4 rounded-sm bg-current text-content outline outline-black/8 -outline-offset-1 dark:outline-white/8"
            style={color ? { backgroundColor: color } : undefined}
          />
        </span>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        aria-label="Choose a color"
        className="w-auto p-1 [&_.react-colorful]:h-48 [&_.react-colorful]:w-52"
      >
        <HexColorPicker color={pickerColor} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
}
