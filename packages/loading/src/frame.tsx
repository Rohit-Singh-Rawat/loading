import type { CSSProperties } from "react";
import { classNames } from "./class-names";
import {
  DEFAULT_SIZE,
  DURATION_VAR,
  PLAY_STATE_VAR,
  SIZE_VAR,
  type SpinnerName,
} from "./motion";
import type { SpinnerProps } from "./types";

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
 * Each appearance prop sets its CSS property on the root element, and only when
 * passed — an omitted prop leaves the property unset so an ancestor's value
 * still cascades in. Precedence is prop, then ancestor, then the default: the
 * spinner's own duration, and the surrounding text color. `size` is the one
 * exception — it always resolves here, so a spinner only destructures it when
 * its markup needs the number too.
 */
export function spinnerRoot(
  name: SpinnerName,
  { className, color, duration, playState, size = DEFAULT_SIZE }: SpinnerProps
) {
  return {
    "aria-hidden": true,
    className: classNames(`ld-${name}`, className),
    style: {
      [SIZE_VAR]: `${size}px`,
      ...(color === undefined ? null : { color }),
      ...(duration === undefined ? null : { [DURATION_VAR]: `${duration}ms` }),
      ...(playState === undefined ? null : { [PLAY_STATE_VAR]: playState }),
    } as CSSProperties,
  };
}
