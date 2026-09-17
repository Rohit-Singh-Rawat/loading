import Link from "next/link";
import { cn } from "@/lib/utils";

const SEGMENTS = [
  { opacity: 1, x: 12, y: 6 },
  { opacity: 0.9, x: 10, y: 2 },
  { opacity: 0.8, x: 6, y: 0 },
  { opacity: 0.7, x: 2, y: 2 },
  { opacity: 0.6, x: 0, y: 6 },
  { opacity: 0.5, x: 2, y: 10 },
  { opacity: 0.4, x: 6, y: 12 },
  { opacity: 0.3, x: 10, y: 10 },
];

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("size-full", className)}
      fill="currentColor"
      viewBox="0 0 15 15"
    >
      {SEGMENTS.map(({ opacity, x, y }) => (
        <g
          key={`${x}-${y}`}
          opacity={opacity}
          transform={`translate(${x} ${y})`}
        >
          <rect height="1" width="1" x="0" y="0" />
          <rect height="1" width="1" x="2" y="0" />
          <rect height="1" width="1" x="0" y="2" />
          <rect height="1" width="1" x="2" y="2" />
        </g>
      ))}
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      aria-label="Home"
      className={cn(
        "block size-7.5 shrink-0 rounded-sm text-orange",
        className
      )}
      href="/"
    >
      <LogoMark />
    </Link>
  );
}
