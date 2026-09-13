import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Kbd({
  children,
  className,
  pressed = false,
  uppercase = true,
  variant = "default",
}: {
  children: ReactNode;
  className?: string;
  pressed?: boolean;
  uppercase?: boolean;
  variant?: "default" | "raised";
}) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 flex-none select-none items-center justify-center rounded-md border border-border font-sans font-semimedium text-[11px] text-content-subtle will-change-transform",
        "transition-[background-color,border-color,color,scale] duration-200 ease-out motion-reduce:transition-none",
        uppercase ? "uppercase" : "normal-case",
        variant === "default" && "bg-background",
        variant === "raised" && "bg-modal",
        pressed && "scale-97 bg-background-hovered text-content",
        className
      )}
    >
      {children}
    </kbd>
  );
}
