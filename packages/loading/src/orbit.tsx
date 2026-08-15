import { SpinnerStyle, spinnerRoot } from "./frame";
import { DEFAULT_SIZE, duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

const css = `
.ld-orbit {
  --ld-orbit-stroke: calc(${SIZE} * 0.0625);
  position: relative;
  width: ${SIZE};
  height: ${SIZE};
}

.ld-orbit-track {
  position: absolute;
  inset: 8%;
  border-radius: 9999px;
  background: conic-gradient(from 180deg, transparent 0deg, currentColor 180deg, transparent 180deg);
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - var(--ld-orbit-stroke)), #000 0);
  mask: radial-gradient(farthest-side, transparent calc(100% - var(--ld-orbit-stroke)), #000 0);
  animation: ld-orbit-rotate ${duration("orbit")} linear infinite;
  animation-play-state: ${PLAY_STATE};
}

.ld-orbit-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 25%;
  height: 25%;
  background: currentColor;
  border-radius: 9999px;
  transform: translate(-50%, -50%);
}

@keyframes ld-orbit-rotate {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-orbit-track {
    animation: none;
  }
}
`;

export function Orbit({ size = DEFAULT_SIZE, ...rest }: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="orbit">{css}</SpinnerStyle>
      <div {...spinnerRoot("orbit", { ...rest, size })}>
        <div className="ld-orbit-dot" />
        <div className="ld-orbit-track" />
      </div>
    </>
  );
}
