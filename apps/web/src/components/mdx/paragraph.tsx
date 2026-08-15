import type { ReactNode } from "react";
import { Text } from "@/components/ui/text";

export function MDXParagraph({
  children,
  ...rest
}: {
  children: ReactNode;
} & Record<string, unknown>) {
  return (
    <Text className="text-content-subtle first:mt-0" size="base" {...rest}>
      {children}
    </Text>
  );
}
