import { SpinnerStyle, spinnerRoot } from "./frame";
import { DEFAULT_SIZE, duration, PLAY_STATE } from "./motion";
import type { SpinnerProps } from "./types";

const css = `
.ld-pulse-ring {
  transform-origin: center;
  animation: ld-pulse-ripple ${duration("pulse")} ease-out infinite;
  animation-play-state: ${PLAY_STATE};
}

@keyframes ld-pulse-ripple {
  from {
    opacity: 0.4;
    transform: scale(0.25);
  }
  to {
    opacity: 0;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-pulse-ring {
    opacity: 0.2;
    animation: none;
  }
}
`;

export function Pulse({ size = DEFAULT_SIZE, ...rest }: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="pulse">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("pulse", { ...rest, size })}
        fill="none"
        height={size}
        role="presentation"
        viewBox="0 0 16 16"
        width={size}
      >
        <circle
          className="ld-pulse-ring"
          cx="8"
          cy="8"
          fill="currentColor"
          r="8"
        />
        <circle cx="8" cy="8" fill="currentColor" r="2" />
      </svg>
    </>
  );
}
