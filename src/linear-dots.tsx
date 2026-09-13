import { cssVars, SpinnerStyle, spinnerRoot } from "./frame";
import { duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

const COUNT = 3;

const DOTS = Array.from({ length: COUNT }, (_, index) => ({
  step: (COUNT - index) % COUNT,
}));

const dur = duration("linear-dots");

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
  animation-delay: calc(${dur} * var(--ld-linear-dots-step) / -${COUNT});
  animation-play-state: ${PLAY_STATE};
}

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
        {DOTS.map((dot, index) => (
          <div
            className="ld-linear-dots-dot"
            key={index}
            style={cssVars({ "--ld-linear-dots-step": dot.step })}
          />
        ))}
      </div>
    </>
  );
}
