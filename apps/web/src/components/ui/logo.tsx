import Link from "next/link";
import { cn } from "@/lib/utils";

// Eight spinner segments on a 15-unit grid, each a 2×2 block of pixels, fading
// counter-clockwise behind the leading segment on the right.
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

const PIXELS = [
  { dx: 0, dy: 0 },
  { dx: 2, dy: 0 },
  { dx: 0, dy: 2 },
  { dx: 2, dy: 2 },
];

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      aria-label="Home"
      className={cn(
        "link-outline block size-7.5 shrink-0 rounded-sm text-orange",
        className
      )}
      href="/"
    >
      <svg
        aria-hidden="true"
        className="size-full"
        fill="currentColor"
        viewBox="0 0 15 15"
      >
        {SEGMENTS.map(({ opacity, x, y }) => (
          <g key={`${x}-${y}`} opacity={opacity}>
            {PIXELS.map(({ dx, dy }) => (
              <rect
                height="1"
                key={`${dx}-${dy}`}
                width="1"
                x={x + dx}
                y={y + dy}
              />
            ))}
          </g>
        ))}
      </svg>
    </Link>
  );
}
