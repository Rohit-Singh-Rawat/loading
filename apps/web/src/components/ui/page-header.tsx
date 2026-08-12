import type { ReactNode } from "react";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export function PageHeader({
  description,
  eyebrow,
  title,
}: {
  description?: ReactNode;
  eyebrow?: ReactNode;
  title: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-5">
      <Heading as="h1" size={1} weight="semibold">
        {eyebrow && (
          <span className="block text-content-subtle">{eyebrow}</span>
        )}
        {title}
      </Heading>
      {description && (
        <Text className="max-w-lg text-pretty text-content-subtle" size="base">
          {description}
        </Text>
      )}
    </header>
  );
}
