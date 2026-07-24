import type { ReactNode } from "react";
import { Text } from "@/components/ui/text";

export function MDXParagraph({
  children,
  ...rest
}: {
  children: ReactNode;
} & Record<string, unknown>) {
  return (
    <Text className="mt-2 text-gray-1000 first:mt-0" size="sm" {...rest}>
      {children}
    </Text>
  );
}
