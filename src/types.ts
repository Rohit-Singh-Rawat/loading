export interface SpinnerProps {
  /** Extra class names merged onto the root element. */
  className?: string;
  /**
   * Any CSS color — `#f97316`, `oklch(70% 0.19 45)`, `rgb(249 115 22 / 60%)`,
   * `var(--brand)`. Omit to keep inheriting the surrounding text color.
   */
  color?: string;
  /**
   * Length of one animation cycle in milliseconds. Omit to inherit
   * `--ld-duration` from an ancestor, then the spinner's own default.
   */
  duration?: number;
  /**
   * Whether the animation runs. Omit to inherit `--ld-play-state` from an
   * ancestor, which defaults to running.
   */
  playState?: "paused" | "running";
  /** Width and height of the spinner in pixels. Defaults to 20. */
  size?: number;
}
