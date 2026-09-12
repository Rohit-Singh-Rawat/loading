"use client";

import { m } from "motion/react";
import { useEffect, useState } from "react";
import { NavItem } from "@/components/ui/nav-item";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
}

const ITEM_HEIGHT = 32;
const ITEM_GAP = 2;

const HIGHLIGHT_SPRING = {
  damping: 80,
  mass: 2,
  stiffness: 800,
  type: "spring" as const,
};

function sameIndexes(a: number[], b: number[]) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function visibleSections(targets: (HTMLElement | null)[]) {
  const viewportHeight = window.innerHeight;
  const tops = targets.map(
    (target) => target?.getBoundingClientRect().top ?? null
  );
  const end =
    targets.at(-1)?.parentElement?.getBoundingClientRect().bottom ??
    Number.POSITIVE_INFINITY;

  const visible: number[] = [];
  tops.forEach((top, index) => {
    if (top === null) {
      return;
    }
    const nextTop = tops.slice(index + 1).find((value) => value !== null);
    const bottom = nextTop ?? end;
    if (bottom > 0 && top < viewportHeight) {
      visible.push(index);
    }
  });
  return visible;
}

export function Toc({ items }: { items: TocItem[] }) {
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const targets = items.map((item) => document.getElementById(item.id));
    let frame = 0;

    const update = () => {
      frame = 0;
      const next = visibleSections(targets);
      setVisible((previous) => (sameIndexes(previous, next) ? previous : next));
    };

    const schedule = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  const [first] = visible;
  const last = visible.at(-1);
  const highlight =
    first === undefined || last === undefined
      ? null
      : {
          height: (last - first + 1) * ITEM_HEIGHT + (last - first) * ITEM_GAP,
          y: first * (ITEM_HEIGHT + ITEM_GAP),
        };

  return (
    <nav aria-label="On this page">
      <ul className="relative isolate flex flex-col gap-0.5">
        {highlight && (
          <m.div
            animate={highlight}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-1 rounded-lg bg-background"
            initial={false}
            transition={HIGHLIGHT_SPRING}
          />
        )}
        {items.map((item, index) => (
          <li key={item.id}>
            <NavItem
              active={first === index}
              className={cn(
                "bg-transparent transition-colors duration-200 ease-out hover:bg-transparent",
                visible.includes(index) && "text-content"
              )}
              href={`#${item.id}`}
              kind="anchor"
              label={item.label}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
