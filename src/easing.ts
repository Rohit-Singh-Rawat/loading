import { duration, PLAY_STATE, type SpinnerName } from "./motion";

export type Easing = "linear" | "ease-in-out" | "stacked";

export const DEFAULT_EASING: Easing = "linear";

export interface EasingProps {
  easing?: Easing;
}

export function spinClass(
  name: SpinnerName,
  easing: Easing = DEFAULT_EASING
): string {
  const base = `ld-${name}-spin`;
  return easing === "linear" ? base : `${base} ${base}-${easing}`;
}

export function rotationCss(name: SpinnerName): string {
  return `
.ld-${name}-spin {
  transform-origin: center;
  animation: ld-${name}-rotate ${duration(name)} linear infinite;
  animation-play-state: ${PLAY_STATE};
}

.ld-${name}-spin-ease-in-out {
  animation-timing-function: ease-in-out;
}

.ld-${name}-spin-stacked {
  animation-name: ld-${name}-rotate, ld-${name}-rotate;
  animation-timing-function: linear, ease-in-out;
  animation-composition: add;
}

@keyframes ld-${name}-rotate {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-${name}-spin {
    animation: none;
  }
}
`;
}
