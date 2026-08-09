import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
} from "react";
import { cn } from "@/lib/utils";

const textSizeClasses = {
  base: "text-base",
  lg: "text-lg",
  sm: "text-sm",
  xl: "text-xl",
} as const;

const textSizeClassesByBreakpoint = {
  "2xl": {
    base: "2xl:text-base",
    lg: "2xl:text-lg",
    sm: "2xl:text-sm",
    xl: "2xl:text-xl",
  },
  lg: {
    base: "lg:text-base",
    lg: "lg:text-lg",
    sm: "lg:text-sm",
    xl: "lg:text-xl",
  },
  md: {
    base: "md:text-base",
    lg: "md:text-lg",
    sm: "md:text-sm",
    xl: "md:text-xl",
  },
  sm: {
    base: "sm:text-base",
    lg: "sm:text-lg",
    sm: "sm:text-sm",
    xl: "sm:text-xl",
  },
  xl: {
    base: "xl:text-base",
    lg: "xl:text-lg",
    sm: "xl:text-sm",
    xl: "xl:text-xl",
  },
} as const;

const textWeightClasses = {
  medium: "font-medium",
  regular: "font-normal",
  semibold: "font-semibold",
  semimedium: "font-[450]",
} as const;

type TextSize = keyof typeof textSizeClasses;
type TextWeight = keyof typeof textWeightClasses;
type ResponsiveBreakpoint = keyof typeof textSizeClassesByBreakpoint;
type ResponsiveTextSize =
  | TextSize
  | ({ initial?: TextSize } & Partial<Record<ResponsiveBreakpoint, TextSize>>);

const RESPONSIVE_BREAKPOINTS: readonly ResponsiveBreakpoint[] = [
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
];

function resolveTextSize(size: ResponsiveTextSize): string {
  if (typeof size === "string") {
    return textSizeClasses[size];
  }
  const parts: string[] = [];
  if (size.initial) {
    parts.push(textSizeClasses[size.initial]);
  }
  for (const bp of RESPONSIVE_BREAKPOINTS) {
    const value = size[bp];
    if (value) {
      parts.push(textSizeClassesByBreakpoint[bp][value]);
    }
  }
  return parts.join(" ");
}

interface TextOwnProps {
  className?: string;
  size?: ResponsiveTextSize;
  truncate?: boolean;
  weight?: TextWeight;
}

export type TextProps<E extends ElementType = "p"> = TextOwnProps & {
  as?: E;
} & Omit<ComponentPropsWithoutRef<E>, keyof TextOwnProps | "as">;

export function Text<E extends ElementType = "p">({
  as,
  size = "base",
  weight = "regular",
  truncate,
  className,
  ...rest
}: TextProps<E>): ReactElement {
  const Component = (as ?? "p") as ElementType;

  return (
    <Component
      className={cn(
        resolveTextSize(size),
        textWeightClasses[weight],
        truncate && "truncate",
        className
      )}
      data-text=""
      {...rest}
    />
  );
}
