import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import styles from "./classic.module.css";
import type { SpinnerProps } from "./types";

const BARS = Array.from({ length: 12 }, (_, index) => index);

export function Classic({ size = 20, className }: SpinnerProps) {
  return (
    <div
      aria-hidden
      className={cn(styles.wrapper, className)}
      style={{ "--spinner-size": `${size}px` } as CSSProperties}
    >
      <div className={styles.spinner}>
        {BARS.map((bar) => (
          <div className={styles.bar} key={bar} />
        ))}
      </div>
    </div>
  );
}
