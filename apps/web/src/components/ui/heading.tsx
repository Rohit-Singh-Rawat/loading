import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
} from "react";
import { cn } from "@/lib/utils";

const headingSizeClasses = {
  1: "text-4xl leading-none tracking-[-0.01em]",
  2: "text-3xl tracking-tight",
  3: "text-2xl tracking-[-0.0125em]",
  4: "text-xl",
  5: "text-lg",
  6: "text-base",
} as const;

const headingWeightClasses = {
  medium: "font-medium",
  regular: "font-normal",
  semibold: "font-semibold",
  semimedium: "font-semimedium",
} as const;

type HeadingSize = keyof typeof headingSizeClasses;
type HeadingWeight = keyof typeof headingWeightClasses;

interface HeadingOwnProps {
  className?: string;
  size: HeadingSize;
  weight?: HeadingWeight;
}

export type HeadingProps<E extends ElementType = "h1"> = HeadingOwnProps & {
  as?: E;
} & Omit<ComponentPropsWithoutRef<E>, keyof HeadingOwnProps | "as">;

export function Heading<E extends ElementType = "h1">({
  as,
  size,
  weight = "medium",
  className,
  ...rest
}: HeadingProps<E>): ReactElement {
  const Component = (as ?? `h${size}`) as ElementType;

  return (
    <Component
      className={cn(
        headingSizeClasses[size],
        headingWeightClasses[weight],
        className
      )}
      data-heading=""
      {...rest}
    />
  );
}
