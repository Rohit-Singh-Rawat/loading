import { SpinnerStyle, spinnerRoot } from "./frame";
import { duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

const DOTS = [0, 1, 2];

const dur = duration("linear-dots");

// Each dot peaks a third of a cycle after the one before it, so the bright dot
// travels left to right and leaves a fading pair behind.
const DOT_RULES = DOTS.map(
  (dot) => `
.ld-linear-dots-dot:nth-child(${dot + 1}) {
  animation-delay: calc(${dur} * -${(((3 - dot) % 3) / 3).toFixed(4)});
}`
).join("\n");

const css = `
.ld-linear-dots {
  display: flex;
  align-items: center;
  gap: calc(${SIZE} * 0.1875);
  height: ${SIZE};
}

.ld-linear-dots-dot {
  width: calc(${SIZE} * 0.1875);
  height: calc(${SIZE} * 0.1875);
  background: currentColor;
  border-radius: 9999px;
  animation: ld-linear-dots-fade ${dur} linear infinite;
  animation-play-state: ${PLAY_STATE};
}
${DOT_RULES}

@keyframes ld-linear-dots-fade {
  0% {
    opacity: 1;
  }
  66.67% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-linear-dots-dot {
    opacity: 0.75;
    animation: none;
  }
}
`;

export function LinearDots(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="linear-dots">{css}</SpinnerStyle>
      <div {...spinnerRoot("linear-dots", props)}>
        {DOTS.map((dot) => (
          <div className="ld-linear-dots-dot" key={dot} />
        ))}
      </div>
    </>
  );
}
