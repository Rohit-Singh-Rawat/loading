import { classNames } from "./class-names";
import type { SpinnerProps } from "./types";

const css = `
.ld-ring-arc {
  transform-origin: center;
  animation: ld-ring-rotate var(--ld-duration, 0.8s) linear infinite;
  animation-play-state: var(--ld-play-state, running);
}

@keyframes ld-ring-rotate {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-ring-arc {
    animation: none;
  }
}
`;

export function Ring({ size = 20, className }: SpinnerProps) {
  return (
    <>
      <style href="ld-ring" precedence="loading-dev">
        {css}
      </style>
      <svg
        aria-hidden="true"
        className={classNames("ld-ring", className)}
        fill="none"
        height={size}
        role="presentation"
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
          className="ld-ring-arc"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeDasharray="16 46.8"
          strokeLinecap="round"
          strokeWidth="2.5"
        />
      </svg>
    </>
  );
}
