import type { ComponentType } from "react";
import { Arc } from "./arc";
import { Atom } from "./atom";
import { Blocks } from "./blocks";
import { BouncingDots } from "./bouncing-dots";
import { CircularDots } from "./circular-dots";
import { Classic } from "./classic";
import { ClassicV2 } from "./classic-v2";
import { Clock } from "./clock";
import { Comet } from "./comet";
import { Compass } from "./compass";
import { LinearDots } from "./linear-dots";
import { Loading } from "./loading";
import type { SpinnerName } from "./motion";
import { Orbit } from "./orbit";
import { Pie } from "./pie";
import { Pulse } from "./pulse";
import { Radar } from "./radar";
import { Ring } from "./ring";
import { Ripple } from "./ripple";
import { Swirl } from "./swirl";
import type { SpinnerProps } from "./types";
import { Wave } from "./wave";

export const SPINNERS = {
  arc: Arc,
  atom: Atom,
  blocks: Blocks,
  "bouncing-dots": BouncingDots,
  "circular-dots": CircularDots,
  classic: Classic,
  "classic-v2": ClassicV2,
  clock: Clock,
  comet: Comet,
  compass: Compass,
  "linear-dots": LinearDots,
  loading: Loading,
  orbit: Orbit,
  pie: Pie,
  pulse: Pulse,
  radar: Radar,
  ring: Ring,
  ripple: Ripple,
  swirl: Swirl,
  wave: Wave,
} satisfies Record<SpinnerName, ComponentType<SpinnerProps>>;
