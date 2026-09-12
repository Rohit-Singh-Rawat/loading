import { SpinnerStyle, spinnerRoot } from "./frame";
import { DEFAULT_SIZE, duration, PLAY_STATE } from "./motion";
import type { SpinnerProps } from "./types";

// Clockwise from twelve o'clock, the head first and its trail fading behind it.
const DOTS = [
  { cx: 8, cy: 1.5, opacity: 1 },
  { cx: 12.5, cy: 3.5, opacity: 0.2 },
  { cx: 14.5, cy: 8, opacity: 0.3 },
  { cx: 12.5, cy: 12.5, opacity: 0.4 },
  { cx: 8, cy: 14.5, opacity: 0.6 },
  { cx: 3.5, cy: 12.5, opacity: 0.7 },
  { cx: 1.5, cy: 8, opacity: 0.8 },
  { cx: 3.5, cy: 3.5, opacity: 0.9 },
];

const css = `
.ld-circular-dots-spin {
  transform-origin: center;
  animation: ld-circular-dots-rotate ${duration("circular-dots")} steps(${DOTS.length}) infinite;
  animation-play-state: ${PLAY_STATE};
}

@keyframes ld-circular-dots-rotate {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-circular-dots-spin {
    animation: none;
  }
}
`;

export function CircularDots({ size = DEFAULT_SIZE, ...rest }: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="circular-dots">{css}</SpinnerStyle>
      <svg
        {...spinnerRoot("circular-dots", { ...rest, size })}
        fill="none"
        height={size}
        role="presentation"
        viewBox="0 0 16 16"
        width={size}
      >
        <g className="ld-circular-dots-spin">
          {DOTS.map((dot) => (
            <circle
              cx={dot.cx}
              cy={dot.cy}
              fill="currentColor"
              key={`${dot.cx}-${dot.cy}`}
              opacity={dot.opacity}
              r="1.5"
            />
          ))}
        </g>
      </svg>
    </>
  );
}
