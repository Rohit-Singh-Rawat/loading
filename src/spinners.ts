import type { ComponentType } from "react";
import { Arc } from "./arc";
import { Atom } from "./atom";
import { Blocks } from "./blocks";
import { BouncingDots } from "./bouncing-dots";
import { Cascade } from "./cascade";
import { Chase } from "./chase";
import { CircularDots } from "./circular-dots";
import { Classic } from "./classic";
import { ClassicV2 } from "./classic-v2";
import { Clock } from "./clock";
import { Collapse } from "./collapse";
import { Comet } from "./comet";
import { Compass } from "./compass";
import { Dual } from "./dual";
import { Eclipse } from "./eclipse";
import { FigureEight } from "./figure-eight";
import { Flip } from "./flip";
import { Fold } from "./fold";
import { Gather } from "./gather";
import { Leap } from "./leap";
import { LinearDots } from "./linear-dots";
import { Loading } from "./loading";
import { Morph } from "./morph";
import type { SpinnerName } from "./motion";
import { Notch } from "./notch";
import { Orbit } from "./orbit";
import { Pendulum } from "./pendulum";
import { Pulse } from "./pulse";
import { Radar } from "./radar";
import { Ring } from "./ring";
import { Ripple } from "./ripple";
import { Slide } from "./slide";
import { Snake } from "./snake";
import { Swirl } from "./swirl";
import { Trace } from "./trace";
import type { SpinnerProps } from "./types";
import { Wave } from "./wave";

export const SPINNERS = {
  arc: Arc,
  atom: Atom,
  blocks: Blocks,
  "bouncing-dots": BouncingDots,
  cascade: Cascade,
  chase: Chase,
  "circular-dots": CircularDots,
  classic: Classic,
  "classic-v2": ClassicV2,
  clock: Clock,
  collapse: Collapse,
  comet: Comet,
  compass: Compass,
  dual: Dual,
  eclipse: Eclipse,
  "figure-eight": FigureEight,
  flip: Flip,
  fold: Fold,
  gather: Gather,
  leap: Leap,
  "linear-dots": LinearDots,
  loading: Loading,
  morph: Morph,
  notch: Notch,
  orbit: Orbit,
  pendulum: Pendulum,
  pulse: Pulse,
  radar: Radar,
  ring: Ring,
  ripple: Ripple,
  slide: Slide,
  snake: Snake,
  swirl: Swirl,
  trace: Trace,
  wave: Wave,
} satisfies Record<SpinnerName, ComponentType<SpinnerProps>>;
