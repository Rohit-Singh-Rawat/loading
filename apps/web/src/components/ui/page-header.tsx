import type { ReactNode } from "react";
import { Heading, type HeadingProps } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

export function PageHeader({
  children,
  className,
  description,
  eyebrow,
  size = 1,
  title,
}: {
  children?: ReactNode;
  className?: string;
  description?: ReactNode;
  eyebrow?: ReactNode;
  size?: HeadingProps["size"];
  title: ReactNode;
}) {
  return (
    <header className={cn("flex flex-col gap-5", className)}>
      <Heading as="h1" className="font-heldane" size={size} weight="regular">
        {eyebrow && <span className="block text-gray-900">{eyebrow}</span>}
        {title}
      </Heading>
      {description && (
        <Text className="max-w-lg text-text-paragraph" size="sm">
          {description}
        </Text>
      )}
      {children}
    </header>
  );
}
