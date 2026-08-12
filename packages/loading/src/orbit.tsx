import type { CSSProperties } from "react";
import { classNames } from "./class-names";
import type { SpinnerProps } from "./types";

const css = `
.ld-orbit {
  --ld-orbit-stroke: calc(var(--spinner-size, 20px) * 0.0625);
  position: relative;
  width: var(--spinner-size, 20px);
  height: var(--spinner-size, 20px);
}

.ld-orbit-track {
  position: absolute;
  inset: 8%;
  border-radius: 9999px;
  background: conic-gradient(from 180deg, transparent 0deg, currentColor 180deg, transparent 180deg);
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - var(--ld-orbit-stroke)), #000 0);
  mask: radial-gradient(farthest-side, transparent calc(100% - var(--ld-orbit-stroke)), #000 0);
  animation: ld-orbit-rotate var(--ld-duration, 0.75s) linear infinite;
  animation-play-state: var(--ld-play-state, running);
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

export function Orbit({ size = 20, className }: SpinnerProps) {
  return (
    <>
      <style href="ld-orbit" precedence="loading-dev">
        {css}
      </style>
      <div
        aria-hidden="true"
        className={classNames("ld-orbit", className)}
        style={{ "--spinner-size": `${size}px` } as CSSProperties}
      >
        <div className="ld-orbit-dot" />
        <div className="ld-orbit-track" />
      </div>
    </>
  );
}
