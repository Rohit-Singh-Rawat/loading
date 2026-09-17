import { cssVars, SpinnerStyle, spinnerRoot, step } from "./frame";
import { duration, PLAY_STATE, SIZE, stagger } from "./motion";
import type { SpinnerProps } from "./types";

const DOTS = [
  { rest: "translate(150%, 0)", step: 0 },
  { rest: "translate(0, 0)", step: 1 },
  { rest: "translate(0, 150%)", step: 2 },
];

const css = `
.ld-slide {
  position: relative;
  width: ${SIZE};
  height: ${SIZE};
}

.ld-slide-dot {
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 40%;
  background: currentColor;
  border-radius: 50%;
  animation: ld-slide-walk ${duration("slide")} ease-in-out infinite;
  animation-delay: ${stagger("slide", DOTS.length)};
  animation-play-state: ${PLAY_STATE};
}

@keyframes ld-slide-walk {
  0% {
    transform: translate(150%, 0);
  }
  8.33%,
  25% {
    transform: translate(150%, 150%);
  }
  33.33%,
  50% {
    transform: translate(0, 150%);
  }
  58.33%,
  75% {
    transform: translate(0, 0);
  }
  83.33%,
  100% {
    transform: translate(150%, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-slide-dot {
    transform: var(--ld-slide-rest);
    animation: none;
  }
}
`;

export function Slide(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="slide">{css}</SpinnerStyle>
      <div {...spinnerRoot("slide", props)}>
        {DOTS.map(({ rest, step: index }) => (
          <div
            className="ld-slide-dot"
            key={index}
            style={cssVars({ ...step(index), "--ld-slide-rest": rest })}
          />
        ))}
      </div>
    </>
  );
}
