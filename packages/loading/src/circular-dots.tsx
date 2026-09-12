import { SpinnerStyle, spinnerRoot } from "./frame";
import { DEFAULT_SIZE, duration, PLAY_STATE } from "./motion";
import type { SpinnerProps } from "./types";

const DOTS = [
  [8, 1.5],
  [12.5962, 3.4038],
  [14.5, 8],
  [12.5962, 12.5962],
  [8, 14.5],
  [3.4038, 12.5962],
  [1.5, 8],
  [3.4038, 3.4038],
] as const;

const dur = duration("circular-dots");

const DOT_RULES = DOTS.map(
  (_, dot) => `
.ld-circular-dots-dot:nth-child(${dot + 1}) {
  animation-delay: calc(${dur} * -${(((DOTS.length - dot) % DOTS.length) / DOTS.length).toFixed(4)});
}`
).join("\n");

const css = `
.ld-circular-dots-dot {
  animation: ld-circular-dots-fade ${dur} linear infinite;
  animation-play-state: ${PLAY_STATE};
}
${DOT_RULES}

@keyframes ld-circular-dots-fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-circular-dots-dot {
    opacity: 0.6;
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
        fill="currentColor"
        height={size}
        role="presentation"
        viewBox="0 0 16 16"
        width={size}
      >
        {DOTS.map(([cx, cy]) => (
          <circle
            className="ld-circular-dots-dot"
            cx={cx}
            cy={cy}
            key={`${cx}-${cy}`}
            r="1.5"
          />
        ))}
      </svg>
    </>
  );
}
