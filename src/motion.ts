export const DURATION_VAR = "--ld-duration";

export const PLAY_STATE_VAR = "--ld-play-state";

export const SIZE_VAR = "--ld-size";

export const STEP_VAR = "--ld-step";

export const DEFAULT_SIZE = 20;

export const SIZE = `var(${SIZE_VAR}, ${DEFAULT_SIZE}px)`;

export const SPINNER_MOTION = {
  arc: 800,
  atom: 1000,
  blocks: 1300,
  "bouncing-dots": 500,
  "circular-dots": 800,
  classic: 1200,
  "classic-v2": 800,
  clock: 1200,
  comet: 700,
  compass: 500,
  "linear-dots": 900,
  orbit: 750,
  pie: 1000,
  pulse: 1200,
  radar: 1500,
  ring: 800,
  ripple: 1200,
  swirl: 1200,
  wave: 900,
} as const satisfies Record<string, number>;

export type SpinnerName = keyof typeof SPINNER_MOTION;

export function duration(name: SpinnerName): string {
  return `var(${DURATION_VAR}, ${SPINNER_MOTION[name]}ms)`;
}

export function stagger(name: SpinnerName, count: number): string {
  return `calc(${duration(name)} * (var(${STEP_VAR}) - ${count}) / ${count})`;
}

export const PLAY_STATE = `var(${PLAY_STATE_VAR}, running)`;
