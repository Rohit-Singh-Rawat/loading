import type { CSSProperties } from "react";
import { classNames } from "./class-names";
import type { SpinnerProps } from "./types";

const DOTS = Array.from({ length: 3 }, (_, index) => index);

const css = `
.ld-dots {
  display: flex;
  align-items: center;
  gap: calc(var(--spinner-size, 20px) * 0.2);
  height: var(--spinner-size, 20px);
}

.ld-dot {
  width: calc(var(--spinner-size, 20px) * 0.22);
  height: calc(var(--spinner-size, 20px) * 0.22);
  background: currentColor;
  border-radius: 9999px;
  animation: ld-dots-bounce 0.5s ease-in-out infinite alternate;
}

.ld-dot:nth-child(1) {
  animation-delay: -0.32s;
}

.ld-dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes ld-dots-bounce {
  from {
    transform: translateY(28%);
  }
  to {
    transform: translateY(-72%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-dot {
    animation: none;
  }
}
`;

export function BouncingDots({ size = 20, className }: SpinnerProps) {
  return (
    <>
      <style href="ld-dots" precedence="loading-dev">
        {css}
      </style>
      <div
        aria-hidden="true"
        className={classNames("ld-dots", className)}
        style={{ "--spinner-size": `${size}px` } as CSSProperties}
      >
        {DOTS.map((dot) => (
          <div className="ld-dot" key={dot} />
        ))}
      </div>
    </>
  );
}
