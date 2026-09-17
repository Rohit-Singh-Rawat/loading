import { SpinnerStyle, spinnerRoot, step } from "./frame";
import { duration, PLAY_STATE, SIZE, STEP_VAR, stagger } from "./motion";
import type { SpinnerProps } from "./types";

const DOTS = Array.from({ length: 3 }, (_, index) => index);

const css = `
.ld-leap {
  position: relative;
  width: ${SIZE};
  height: ${SIZE};
}

.ld-leap-wrapper {
  position: absolute;
  inset: 0;
  animation: ld-leap-hop ${duration("leap")} ease-in-out infinite;
  animation-delay: ${stagger("leap", DOTS.length)};
  animation-play-state: ${PLAY_STATE};
}

.ld-leap-dot {
  position: absolute;
  top: 39%;
  left: 0;
  width: 22%;
  height: 22%;
  background: currentColor;
  border-radius: 50%;
}

@keyframes ld-leap-hop {
  0% {
    transform: translateX(0) rotate(0);
  }
  33.33% {
    transform: translateX(0) rotate(180deg);
  }
  66.66% {
    transform: translateX(-39%) rotate(180deg);
  }
  99.99% {
    transform: translateX(-78%) rotate(180deg);
  }
  100% {
    transform: translateX(0) rotate(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-leap-wrapper {
    transform: translateX(calc(var(${STEP_VAR}) * 39%));
    animation: none;
  }
}
`;

export function Leap(props: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="leap">{css}</SpinnerStyle>
      <div {...spinnerRoot("leap", props)}>
        {DOTS.map((index) => (
          <div className="ld-leap-wrapper" key={index} style={step(index)}>
            <div className="ld-leap-dot" />
          </div>
        ))}
      </div>
    </>
  );
}
