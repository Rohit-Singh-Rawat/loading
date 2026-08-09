"use client";

import { useEffect, useRef, useState } from "react";
import { NavItem } from "@/components/ui/nav-item";

export interface TocItem {
  id: string;
  label: string;
}

export const TOC_ITEMS: TocItem[] = [
  { id: "preview", label: "Preview" },
  { id: "customization", label: "Customization" },
  { id: "usage", label: "Usage" },
];

export function Toc({ items }: { items: TocItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const userNavigating = useRef(false);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const visibleSet = new Set<number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = items.findIndex((item) => item.id === entry.target.id);
          if (index === -1) {
            continue;
          }
          if (entry.isIntersecting) {
            visibleSet.add(index);
          } else {
            visibleSet.delete(index);
          }
        }

        if (userNavigating.current || visibleSet.size === 0) {
          return;
        }

        setActiveIndex(Math.min(...Array.from(visibleSet)));
      },
      { rootMargin: "-100px 0px 0px 0px" }
    );

    for (const item of items) {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="flex flex-col gap-0.5">
      {items.map((item, index) => (
        <NavItem
          active={activeIndex === index}
          href={`#${item.id}`}
          key={item.id}
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
      ))}
    </nav>
  );
}
