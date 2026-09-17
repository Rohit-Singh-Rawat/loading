import { SpinnerStyle, spinnerRoot } from "./frame";
import { duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

export type PendulumPivot = "bottom" | "top";

export const DEFAULT_PENDULUM_PIVOT: PendulumPivot = "top";

export interface PendulumProps extends SpinnerProps {
  pivot?: PendulumPivot;
}

const css = `
.ld-pendulum {
  position: relative;
  width: ${SIZE};
  height: ${SIZE};
}

.ld-pendulum-arm {
  position: absolute;
  left: 45%;
  width: 10%;
  height: 56%;
  background: currentColor;
  border-radius: 9999px;
  animation: ld-pendulum-swing ${duration("pendulum")} ease-in-out infinite alternate;
  animation-play-state: ${PLAY_STATE};
}

.ld-pendulum-arm::after {
  content: "";
  position: absolute;
  left: 50%;
  width: calc(${SIZE} * 0.28);
  height: calc(${SIZE} * 0.28);
  background: currentColor;
  border-radius: 50%;
}

.ld-pendulum-arm-top {
  top: 10%;
  transform-origin: 50% 0;
}

.ld-pendulum-arm-top::after {
  bottom: 0;
  transform: translate(-50%, 50%);
}

.ld-pendulum-arm-bottom {
  bottom: 10%;
  transform-origin: 50% 100%;
}

.ld-pendulum-arm-bottom::after {
  top: 0;
  transform: translate(-50%, -50%);
}

@keyframes ld-pendulum-swing {
  from {
    transform: rotate(-35deg);
  }
  to {
    transform: rotate(35deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-pendulum-arm {
    animation: none;
  }
}
`;

export function Pendulum({
  pivot = DEFAULT_PENDULUM_PIVOT,
  ...rest
}: PendulumProps) {
  return (
    <>
      <SpinnerStyle name="pendulum">{css}</SpinnerStyle>
      <div {...spinnerRoot("pendulum", rest)}>
        <div className={`ld-pendulum-arm ld-pendulum-arm-${pivot}`} />
      </div>
    </>
  );
}
