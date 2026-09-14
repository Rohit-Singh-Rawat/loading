"use client";

import { m } from "motion/react";

type Position = "top" | "bottom";

const lineVariants = {
  collapsed: (position: Position) => ({
    rotate: 0,
    scaleX: 1,
    y: position === "top" ? -4 : 4,
  }),
  expanded: (position: Position) => ({
    rotate: position === "top" ? 48 : -48,
    scaleX: 1.1,
    y: 0,
  }),
};

export function NavigationMobileIcon({ isExpanded }: { isExpanded: boolean }) {
  return (
    <div className="relative flex size-6 flex-col items-center justify-center will-change-transform">
      {(["top", "bottom"] as const).map((position) => (
        <m.div
          animate={isExpanded ? "expanded" : "collapsed"}
          className="absolute h-0.5 w-4 bg-content"
          custom={position}
          initial={false}
          key={position}
          transition={{
            duration: 0.15,
            ease: [0.31, 0.05, 0.43, 1.02],
          }}
          variants={lineVariants}
        />
      ))}
    </div>
  );
}
