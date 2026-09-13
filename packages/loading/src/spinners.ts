import type { ComponentType } from "react";
import { Arc } from "./arc";
import { BouncingDots } from "./bouncing-dots";
import { CircularDots } from "./circular-dots";
import { Classic } from "./classic";
import { Clock } from "./clock";
import { Comet } from "./comet";
import { Compass } from "./compass";
import { Drive } from "./drive";
import { Grid } from "./grid";
import { LinearDots } from "./linear-dots";
import type { SpinnerName } from "./motion";
import { Orbit } from "./orbit";
import { Pulse } from "./pulse";
import { Radar } from "./radar";
import { Ring } from "./ring";
import { Ripple } from "./ripple";
import { Swirl } from "./swirl";
import type { SpinnerProps } from "./types";

/** Every spinner under its `ld-` key. */
export const SPINNERS = {
  arc: Arc,
  "bouncing-dots": BouncingDots,
  "circular-dots": CircularDots,
  classic: Classic,
  clock: Clock,
  comet: Comet,
  compass: Compass,
  drive: Drive,
  grid: Grid,
  "linear-dots": LinearDots,
  orbit: Orbit,
  pulse: Pulse,
  radar: Radar,
  ring: Ring,
  ripple: Ripple,
  swirl: Swirl,
} satisfies Record<SpinnerName, ComponentType<SpinnerProps>>;
