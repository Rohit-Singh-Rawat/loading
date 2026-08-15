import { SpinnerStyle, spinnerRoot } from "./frame";
import { DEFAULT_SIZE, duration, PLAY_STATE, SIZE } from "./motion";
import type { SpinnerProps } from "./types";

const css = `
.ld-comet {
  --ld-comet-stroke: calc(${SIZE} * 0.12);
  position: relative;
  width: ${SIZE};
  height: ${SIZE};
  animation: ld-comet-rotate ${duration("comet")} linear infinite;
  animation-play-state: ${PLAY_STATE};
}

.ld-comet-tail {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: conic-gradient(from 0deg, transparent, currentColor);
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - var(--ld-comet-stroke)), #000 0);
  mask: radial-gradient(farthest-side, transparent calc(100% - var(--ld-comet-stroke)), #000 0);
}

.ld-comet-head {
  position: absolute;
  top: 0;
  left: 50%;
  width: var(--ld-comet-stroke);
  height: var(--ld-comet-stroke);
  background: currentColor;
  border-radius: 9999px;
  transform: translateX(-50%);
}

@keyframes ld-comet-rotate {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-comet {
    animation: none;
  }
}
`;

export function Comet({ size = DEFAULT_SIZE, ...rest }: SpinnerProps) {
  return (
    <>
      <SpinnerStyle name="comet">{css}</SpinnerStyle>
      <div {...spinnerRoot("comet", { ...rest, size })}>
        <div className="ld-comet-tail" />
        <div className="ld-comet-head" />
      </div>
    </>
  );
}
