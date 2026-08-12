import type { CSSProperties } from "react";
import { classNames } from "./class-names";
import type { SpinnerProps } from "./types";

const css = `
.ld-comet {
  --ld-comet-stroke: calc(var(--spinner-size, 20px) * 0.12);
  position: relative;
  width: var(--spinner-size, 20px);
  height: var(--spinner-size, 20px);
  animation: ld-comet-rotate var(--ld-duration, 0.7s) linear infinite;
  animation-play-state: var(--ld-play-state, running);
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

export function Comet({ size = 20, className }: SpinnerProps) {
  return (
    <>
      <style href="ld-comet" precedence="loading-dev">
        {css}
      </style>
      <div
        aria-hidden="true"
        className={classNames("ld-comet", className)}
        style={{ "--spinner-size": `${size}px` } as CSSProperties}
      >
        <div className="ld-comet-tail" />
        <div className="ld-comet-head" />
      </div>
    </>
  );
}
