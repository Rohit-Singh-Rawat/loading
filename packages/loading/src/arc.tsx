import { classNames } from "./class-names";
import type { SpinnerProps } from "./types";

const css = `
.ld-arc {
  animation: ld-arc-rotate var(--ld-duration, 0.8s) linear infinite;
  animation-play-state: var(--ld-play-state, running);
}

@keyframes ld-arc-rotate {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-arc {
    animation: none;
  }
}
`;

export function Arc({ size = 20, className }: SpinnerProps) {
  return (
    <>
      <style href="ld-arc" precedence="loading-dev">
        {css}
      </style>
      <svg
        aria-hidden="true"
        className={classNames("ld-arc", className)}
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
    </>
  );
}
