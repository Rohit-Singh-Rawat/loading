import { SpinnerStyle, spinnerRoot } from "./frame";
import { DEFAULT_SIZE, duration, PLAY_STATE } from "./motion";
import type { SpinnerProps } from "./types";

const css = `
.ld-ring-arc {
  transform-origin: center;
  animation: ld-ring-rotate ${duration("ring")} linear infinite;
  animation-play-state: ${PLAY_STATE};
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

export function Ring({ size = DEFAULT_SIZE, ...rest }: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="ring">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("ring", { ...rest, size })}
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
