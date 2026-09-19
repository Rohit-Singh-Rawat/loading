"use client";

import { type RefObject, useEffect, useState } from "react";

function hex(channels: Uint8ClampedArray): string {
  return `#${Array.from(channels, (channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

export function useInheritedColor(
  ref: RefObject<HTMLElement | null>
): string | null {
  const [color, setColor] = useState<string | null>(null);

  useEffect(() => {
    const element = ref.current;
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    if (!(element && context)) {
      return;
    }

    const update = () => {
      context.fillStyle = getComputedStyle(element).color;
      context.fillRect(0, 0, 1, 1);
      setColor(hex(context.getImageData(0, 0, 1, 1).data.slice(0, 3)));
    };
    const theme = window.matchMedia("(prefers-color-scheme: dark)");
    update();
    theme.addEventListener("change", update);
    return () => theme.removeEventListener("change", update);
  }, [ref]);

  return color;
}
