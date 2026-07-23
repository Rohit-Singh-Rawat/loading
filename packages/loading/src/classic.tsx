import type { CSSProperties } from "react";
import { classNames } from "./class-names";
import type { SpinnerProps } from "./types";

const BARS = Array.from({ length: 12 }, (_, index) => index);

const BAR_RULES = BARS.map(
  (bar) => `
.ld-classic-bar:nth-child(${bar + 1}) {
  transform: rotate(${bar === 0 ? "0.0001" : bar * 30}deg) translate(146%);
  animation-delay: ${(-1.2 + bar * 0.1).toFixed(1)}s;
}`
).join("\n");

const css = `
.ld-classic {
  width: var(--spinner-size, 20px);
  height: var(--spinner-size, 20px);
}

.ld-classic-inner {
  position: relative;
  top: 50%;
  left: 50%;
  width: var(--spinner-size, 20px);
  height: var(--spinner-size, 20px);
}

.ld-classic-bar {
  position: absolute;
  top: -3.9%;
  left: -10%;
  width: 24%;
  height: 8%;
  background: currentColor;
  border-radius: 6px;
  animation: ld-classic-spin 1.2s linear infinite;
}
${BAR_RULES}

@keyframes ld-classic-spin {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.15;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-classic-bar {
    opacity: 0.5;
    animation: none;
  }
}
`;

export function Classic({ size = 20, className }: SpinnerProps) {
  return (
    <>
      <style href="ld-classic" precedence="loading-dev">
        {css}
      </style>
      <div
        aria-hidden="true"
        className={classNames("ld-classic", className)}
        style={{ "--spinner-size": `${size}px` } as CSSProperties}
      >
        <div className="ld-classic-inner">
          {BARS.map((bar) => (
            <div className="ld-classic-bar" key={bar} />
          ))}
        </div>
      </div>
    </>
  );
}
