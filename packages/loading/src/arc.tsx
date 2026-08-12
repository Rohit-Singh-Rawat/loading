import { DEFAULT_SIZE, SpinnerStyle, spinnerRoot } from "./frame";
import { duration, PLAY_STATE } from "./motion";
import type { SpinnerProps } from "./types";

const css = `
.ld-arc {
  animation: ld-arc-rotate ${duration("arc")} linear infinite;
  animation-play-state: ${PLAY_STATE};
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

export function Arc({ size = DEFAULT_SIZE, className }: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="arc">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("arc", { className, size })}
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
