import type { ComponentType } from "react";
import { Arc } from "./arc";
import { BouncingDots } from "./bouncing-dots";
import { CircularDots } from "./circular-dots";
import { Classic } from "./classic";
import { ClassicV2 } from "./classic-v2";
import { Clock } from "./clock";
import { Comet } from "./comet";
import { Compass } from "./compass";
import { LinearDots } from "./linear-dots";
import type { SpinnerName } from "./motion";
import { Orbit } from "./orbit";
import { Pulse } from "./pulse";
import { Radar } from "./radar";
import { Ring } from "./ring";
import { Swirl } from "./swirl";
import type { SpinnerProps } from "./types";

export const SPINNERS = {
  arc: Arc,
  "bouncing-dots": BouncingDots,
  "circular-dots": CircularDots,
  classic: Classic,
  "classic-v2": ClassicV2,
  clock: Clock,
  comet: Comet,
  compass: Compass,
  "linear-dots": LinearDots,
  orbit: Orbit,
  pulse: Pulse,
  radar: Radar,
  ring: Ring,
  swirl: Swirl,
} satisfies Record<SpinnerName, ComponentType<SpinnerProps>>;
