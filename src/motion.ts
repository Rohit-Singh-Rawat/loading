export const DURATION_VAR = "--ld-duration";

export const PLAY_STATE_VAR = "--ld-play-state";

export const SIZE_VAR = "--ld-size";

export const DEFAULT_SIZE = 20;

export const SIZE = `var(${SIZE_VAR}, ${DEFAULT_SIZE}px)`;

export interface SpinnerMotion {
  duration: number;
}

export const SPINNER_MOTION = {
  arc: { duration: 800 },
  "bouncing-dots": { duration: 500 },
  "circular-dots": { duration: 800 },
  classic: { duration: 1200 },
  "classic-v2": { duration: 800 },
  clock: { duration: 1200 },
  comet: { duration: 700 },
  compass: { duration: 500 },
  "linear-dots": { duration: 900 },
  orbit: { duration: 750 },
  pulse: { duration: 1200 },
  radar: { duration: 1500 },
  ring: { duration: 800 },
  swirl: { duration: 1200 },
} as const satisfies Record<string, SpinnerMotion>;

export type SpinnerName = keyof typeof SPINNER_MOTION;

export function duration(name: SpinnerName): string {
  return `var(${DURATION_VAR}, ${SPINNER_MOTION[name].duration}ms)`;
}

export const PLAY_STATE = `var(${PLAY_STATE_VAR}, running)`;
