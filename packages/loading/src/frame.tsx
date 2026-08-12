import type { CSSProperties } from "react";
import { classNames } from "./class-names";
import { SIZE_VAR, type SpinnerName } from "./motion";
import type { SpinnerProps } from "./types";

/**
 * The frame every spinner is built on: hoisted styles, the root element's
 * accessibility attributes, class merging, and the size custom property.
 *
 * Each spinner still owns its own CSS and markup — this only absorbs the
 * parts that were identical in all of them.
 */

/** Width and height in pixels when `size` is not given. */
export const DEFAULT_SIZE = 20;

/** CSS value for the rendered size, falling back to the documented default. */
export const SIZE = `var(${SIZE_VAR}, ${DEFAULT_SIZE}px)`;

/**
 * Hoists a spinner's CSS via React's `precedence` support, so consumers need
 * no CSS file and no bundler configuration. `name` keys the stylesheet — it
 * must be unique per spinner, which is why it is typed against the motion
 * record rather than left as a free string.
 */
export function SpinnerStyle({
  children,
  name,
}: {
  children: string;
  name: SpinnerName;
}) {
  return (
    <style href={`ld-${name}`} precedence="loading-dev">
      {children}
    </style>
  );
}

/**
 * Attributes shared by every spinner's root element. Spinners are decorative —
 * `aria-hidden` keeps them out of the accessibility tree, so the surrounding
 * control is responsible for announcing that something is loading.
 */
export function spinnerRoot(
  name: SpinnerName,
  { className, size }: Required<Pick<SpinnerProps, "size">> & SpinnerProps
) {
  return {
    "aria-hidden": true,
    className: classNames(`ld-${name}`, className),
    style: { [SIZE_VAR]: `${size}px` } as CSSProperties,
  } as const;
}
