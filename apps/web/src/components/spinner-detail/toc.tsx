"use client";

import { useEffect, useRef, useState } from "react";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

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
    <nav className="flex flex-col gap-0.5">
      {items.map((item, index) => (
        <Text
          as="a"
          className={cn(
            "link-outline flex h-8 w-full items-center rounded-lg px-3",
            activeIndex === index
              ? "bg-gray-300 text-gray-1200"
              : "text-gray-1000 hover:bg-gray-300 hover:text-gray-1200"
          )}
          href={`#${item.id}`}
          key={item.id}
          onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            setActiveIndex(index);
            userNavigating.current = true;

            const element = document.getElementById(item.id);
            if (element) {
              const top =
                element.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({ behavior: "instant", top });
            }

            window.setTimeout(() => {
              userNavigating.current = false;
            }, 300);
          }}
          size="sm"
          weight={activeIndex === index ? "semimedium" : "regular"}
        >
          {item.label}
        </Text>
      ))}
    </nav>
  );
}
