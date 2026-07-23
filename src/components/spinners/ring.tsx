import { cn } from "@/lib/utils";
import styles from "./arc.module.css";
import type { SpinnerProps } from "./types";

export function Ring({ size = 20, className }: SpinnerProps) {
  return (
    <svg
      aria-hidden
      className={cn(className)}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <circle
        cx="12"
        cy="12"
        opacity="0.2"
        r="10"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <circle
        className={styles.arc}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeDasharray="16 46.8"
        strokeLinecap="round"
        strokeWidth="2.5"
        style={{ transformOrigin: "center" }}
      />
    </svg>
  );
}
