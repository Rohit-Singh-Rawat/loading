import { duration, PLAY_STATE, type SpinnerName } from "./motion";

/**
 * How a rotating spinner travels around its circle. `linear` keeps a constant
 * speed. `ease-in-out` surges through each turn and pauses at its end.
 * `stacked` layers the two, so it surges without ever coming to rest.
 */
export type Easing = "linear" | "ease-in-out" | "stacked";

export interface EasingProps {
  /** How the spinner travels around its circle. Defaults to `linear`. */
  easing?: Easing;
}

/**
 * Class names for the element that rotates. `stacked` puts that element,
 * eased, inside an `ld-<name>-layer` that rotates linearly underneath it.
 */
export function spinClass(name: SpinnerName, easing: Easing): string {
  const base = `ld-${name}-spin`;
  return easing === "linear" ? base : `${base} ${base}-eased`;
}

/** The rotation a rotating spinner's stylesheet needs, keyed under its name. */
export function rotationCss(name: SpinnerName): string {
  return `
.ld-${name}-spin,
.ld-${name}-layer {
  transform-origin: center;
  animation: ld-${name}-rotate ${duration(name)} linear infinite;
  animation-play-state: ${PLAY_STATE};
}

.ld-${name}-spin-eased {
  animation-timing-function: ease-in-out;
}

@keyframes ld-${name}-rotate {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ld-${name}-spin,
  .ld-${name}-layer {
    animation: none;
  }
}
`;
}
