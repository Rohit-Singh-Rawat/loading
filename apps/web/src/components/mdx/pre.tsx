import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MDXPre({
  children,
  className,
  ...rest
}: {
  children: ReactNode;
  className?: string;
} & Record<string, unknown>) {
  return (
    <pre
      className={cn(
        "tab-size-4 overflow-x-auto overscroll-x-contain px-4 py-3 font-berkeley-mono text-[13px] leading-5 [scrollbar-color:var(--color-gray-600)_transparent] [scrollbar-width:thin] **:font-berkeley-mono [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1",
        className
      )}
      {...rest}
    >
      {children}
    </pre>
  );
}
