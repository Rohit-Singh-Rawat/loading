import { cn } from "@/lib/utils";
import styles from "./arc.module.css";
import type { SpinnerProps } from "./types";

export function Arc({ size = 20, className }: SpinnerProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn(styles.arc, className)}
      fill="none"
      height={size}
      role="presentation"
      viewBox="0 0 24 24"
      width={size}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeDasharray="18 44.8"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
    </svg>
  );
}
