"use client";

import { m } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Text } from "@/components/ui/text";
import { PROSE_SECTION_ID } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
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

// A section runs from its own anchor to the next one; the last runs to the end
// of the prose column.
function visibleSections(targets: (HTMLElement | null)[]) {
  const viewportHeight = window.innerHeight;
  const tops = targets.map(
    (target) => target?.getBoundingClientRect().top ?? null
  );
  const end =
    document.getElementById(PROSE_SECTION_ID)?.getBoundingClientRect().bottom ??
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

function measureHighlight(list: HTMLElement, visible: number[]) {
  const rows = list.querySelectorAll<HTMLElement>(":scope > li");
  const first = rows[visible[0]];
  const last = rows[visible.at(-1) ?? -1];
  if (!(first && last)) {
    return null;
  }
  return {
    height: last.offsetTop + last.offsetHeight - first.offsetTop,
    y: first.offsetTop,
  };
}

function TocLink({
  current,
  item,
  visible,
}: {
  current: boolean;
  item: TocItem;
  visible: boolean;
}) {
  return (
    <Text
      aria-current={current ? "location" : undefined}
      as="a"
      className={cn(
        "link-outline relative flex h-8 w-full items-center rounded-lg px-3 transition-colors duration-200 ease-out after:absolute after:inset-x-0 after:-inset-y-px after:content-['']",
        visible ? "text-content" : "text-content-subtle hover:text-content"
      )}
      href={`#${item.id}`}
      size="sm"
      weight="semimedium"
    >
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
    </Text>
  );
}

export function Toc({ items }: { items: TocItem[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  const [state, setState] = useState<{
    highlight: { height: number; y: number } | null;
    visible: number[];
  }>({ highlight: null, visible: [] });

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const targets = items.map((item) => document.getElementById(item.id));
    let frame = 0;

    const update = () => {
      frame = 0;
      const visible = visibleSections(targets);
      setState((previous) => {
        if (sameIndexes(previous.visible, visible)) {
          return previous;
        }
        const list = listRef.current;
        return {
          highlight: list ? measureHighlight(list, visible) : null,
          visible,
        };
      });
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

  const { highlight, visible } = state;
  const [first] = visible;

  return (
    <nav aria-label="On this page">
      <ul className="relative isolate flex flex-col gap-0.5" ref={listRef}>
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
            <TocLink
              current={first === index}
              item={item}
              visible={visible.includes(index)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
