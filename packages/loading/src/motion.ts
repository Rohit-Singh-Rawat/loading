/**
 * The motion contract every spinner honours.
 *
 * These custom properties are part of the public interface even though they
 * are not props: set them on any ancestor and they cascade down to the
 * spinner. `SPINNER_MOTION` is the machine-readable half — it lets a consumer
 * (the docs site's customization panel, for instance) seed a control with the
 * same default the CSS uses, instead of hard-coding a second copy of it.
 */

/** Overrides the animation duration. Accepts any CSS time value. */
export const DURATION_VAR = "--ld-duration";

/** Pauses or resumes the animation. `running` (default) or `paused`. */
export const PLAY_STATE_VAR = "--ld-play-state";

/** Overrides the rendered size. Set by the `size` prop; readable by consumers. */
export const SIZE_VAR = "--spinner-size";

export interface SpinnerMotion {
  /** Default animation duration in milliseconds. */
  duration: number;
}

/** Default duration per spinner, keyed by the spinner's `ld-` class name. */
export const SPINNER_MOTION = {
  arc: { duration: 800 },
  "bouncing-dots": { duration: 500 },
  classic: { duration: 1200 },
  comet: { duration: 700 },
  grid: { duration: 1200 },
  orbit: { duration: 750 },
  ring: { duration: 800 },
  ripple: { duration: 1200 },
} as const satisfies Record<string, SpinnerMotion>;

export type SpinnerName = keyof typeof SPINNER_MOTION;

/** CSS value for a spinner's duration, falling back to its documented default. */
export function duration(name: SpinnerName): string {
  return `var(${DURATION_VAR}, ${SPINNER_MOTION[name].duration}ms)`;
}

/** CSS value for `animation-play-state`. */
export const PLAY_STATE = `var(${PLAY_STATE_VAR}, running)`;
