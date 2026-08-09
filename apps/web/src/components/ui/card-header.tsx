import type { ReactNode } from "react";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

export function CardHeader({
  children,
  className,
  title,
}: {
  children?: ReactNode;
  className?: string;
  title: string;
}) {
  return (
    <div
      className={cn(
        "flex h-8 items-center justify-between pr-1 pl-2",
        className
      )}
    >
      <Text
        as="span"
        className="select-none text-content-subtle"
        size="sm"
        weight="medium"
      >
        {title}
      </Text>
      {children}
    </div>
  );
}
