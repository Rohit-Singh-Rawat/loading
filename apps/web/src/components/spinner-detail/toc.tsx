"use client";

import { m } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { NavItem } from "@/components/ui/nav-item";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
}

interface HighlightRange {
  height: number;
  top: number;
}

const HIGHLIGHT_SPRING = {
  damping: 80,
  mass: 2,
  stiffness: 800,
  type: "spring" as const,
};

function sameIndexes(a: number[], b: number[]) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function sameRange(a: HighlightRange | null, b: HighlightRange) {
  return a !== null && a.top === b.top && a.height === b.height;
}

// A section runs from its own anchor to the next one; the last runs to the end
// of the container the anchor sits in.
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [range, setRange] = useState<HighlightRange | null>(null);
  const userNavigating = useRef(false);
  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

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
      const [first] = next;
      if (!userNavigating.current && first !== undefined) {
        setActiveIndex(first);
      }
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

  useEffect(() => {
    const list = listRef.current;
    const [firstIndex] = visible;
    const lastIndex = visible.at(-1);

    if (!list || firstIndex === undefined || lastIndex === undefined) {
      setRange(null);
      return;
    }

    const measure = () => {
      const firstEl = itemRefs.current[firstIndex];
      const lastEl = itemRefs.current[lastIndex];
      if (!(firstEl && lastEl)) {
        return;
      }
      const listRect = list.getBoundingClientRect();
      const firstRect = firstEl.getBoundingClientRect();
      const lastRect = lastEl.getBoundingClientRect();
      const next = {
        height: lastRect.bottom - firstRect.top,
        top: firstRect.top - listRect.top,
      };
      setRange((previous) => (sameRange(previous, next) ? previous : next));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);

    return () => observer.disconnect();
  }, [visible]);

  return (
    <nav aria-label="On this page">
      <ul className="relative isolate flex flex-col gap-0.5" ref={listRef}>
        {range && (
          <m.div
            animate={{ height: range.height, y: range.top }}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-1 rounded-lg bg-background"
            initial={false}
            transition={HIGHLIGHT_SPRING}
          />
        )}
        {items.map((item, index) => (
          <li
            key={item.id}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
          >
            <NavItem
              active={activeIndex === index}
              className={cn(
                "bg-transparent transition-colors duration-200 ease-out hover:bg-transparent",
                visible.includes(index) ? "text-content" : "text-content-subtle"
              )}
              href={`#${item.id}`}
              kind="anchor"
              label={item.label}
              onClick={() => {
                setActiveIndex(index);
                userNavigating.current = true;
                window.setTimeout(() => {
                  userNavigating.current = false;
                }, 300);
              }}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
