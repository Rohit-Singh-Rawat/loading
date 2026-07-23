import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import type { SpinnerProps } from "../types";
import styles from "./bouncing-dots.module.css";

const DOTS = Array.from({ length: 3 }, (_, index) => index);

export function BouncingDots({ size = 20, className }: SpinnerProps) {
  return (
    <div
      aria-hidden
      className={cn(styles.dots, className)}
      style={{ "--spinner-size": `${size}px` } as CSSProperties}
    >
      {DOTS.map((dot) => (
        <div className={styles.dot} key={dot} />
      ))}
    </div>
  );
}
