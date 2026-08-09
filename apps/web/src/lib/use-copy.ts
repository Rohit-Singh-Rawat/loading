"use client";

import { useEffect, useRef, useState } from "react";

export type CopyStatus = "copied" | "failed" | "idle";

const RESET_DELAY_MS = 2000;

export function useCopy(text: string) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timeoutRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  async function copy() {
    let next: CopyStatus = "copied";
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      next = "failed";
    }
    setStatus(next);
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(
      () => setStatus("idle"),
      RESET_DELAY_MS
    );
  }

  return { copy, status };
}
