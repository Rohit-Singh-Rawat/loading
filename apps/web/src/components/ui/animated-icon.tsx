"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";

const ICON_TRANSITION = { bounce: 0, duration: 0.3, type: "spring" as const };

const ICON_HIDDEN = { filter: "blur(4px)", opacity: 0, scale: 0.25 } as const;
const ICON_VISIBLE = { filter: "blur(0px)", opacity: 1, scale: 1 } as const;

interface AnimatedIconProps {
  active: boolean;
  activeIcon: React.ReactNode;
  idleIcon: React.ReactNode;
}

export function AnimatedIcon({
  active,
  activeIcon,
  idleIcon,
}: AnimatedIconProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false} mode="popLayout">
      <m.span
        animate={ICON_VISIBLE}
        aria-hidden="true"
        className="flex will-change-transform"
        exit={shouldReduceMotion ? ICON_VISIBLE : ICON_HIDDEN}
        initial={shouldReduceMotion ? false : ICON_HIDDEN}
        key={active ? "active" : "idle"}
        transition={shouldReduceMotion ? { duration: 0 } : ICON_TRANSITION}
      >
        {active ? activeIcon : idleIcon}
      </m.span>
    </AnimatePresence>
  );
}
