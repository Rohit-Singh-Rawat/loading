import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
} from "react";
import { cn } from "@/lib/utils";

const headingSizeClasses = {
  1: "text-4xl tracking-tight",
  2: "text-3xl tracking-tight",
  3: "text-2xl tracking-[-0.0125em]",
  4: "text-xl",
  5: "text-lg",
  6: "text-base",
} as const;

const headingSizeClassesByBreakpoint = {
  "2xl": {
    1: "2xl:text-4xl 2xl:tracking-tight",
    2: "2xl:text-3xl 2xl:tracking-tight",
    3: "2xl:text-2xl 2xl:tracking-tight",
    4: "2xl:text-xl",
    5: "2xl:text-lg",
    6: "2xl:text-base",
  },
  lg: {
    1: "lg:text-4xl lg:tracking-tight",
    2: "lg:text-3xl lg:tracking-tight",
    3: "lg:text-2xl lg:tracking-tight",
    4: "lg:text-xl",
    5: "lg:text-lg",
    6: "lg:text-base",
  },
  md: {
    1: "md:text-4xl md:tracking-tight",
    2: "md:text-3xl md:tracking-tight",
    3: "md:text-2xl md:tracking-tight",
    4: "md:text-xl",
    5: "md:text-lg",
    6: "md:text-base",
  },
  sm: {
    1: "sm:text-4xl sm:tracking-tight",
    2: "sm:text-3xl sm:tracking-tight",
    3: "sm:text-2xl sm:tracking-tight",
    4: "sm:text-xl",
    5: "sm:text-lg",
    6: "sm:text-base",
  },
  xl: {
    1: "xl:text-4xl xl:tracking-tight",
    2: "xl:text-3xl xl:tracking-tight",
    3: "xl:text-2xl xl:tracking-tight",
    4: "xl:text-xl",
    5: "xl:text-lg",
    6: "xl:text-base",
  },
} as const;

const headingWeightClasses = {
  medium: "font-medium",
  regular: "font-normal",
  semibold: "font-semibold",
  semimedium: "font-[450]",
} as const;

type HeadingSize = keyof typeof headingSizeClasses;
type HeadingWeight = keyof typeof headingWeightClasses;
type ResponsiveBreakpoint = keyof typeof headingSizeClassesByBreakpoint;
type ResponsiveHeadingSize =
  | HeadingSize
  | ({ initial?: HeadingSize } & Partial<
      Record<ResponsiveBreakpoint, HeadingSize>
    >);

const RESPONSIVE_BREAKPOINTS: readonly ResponsiveBreakpoint[] = [
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
];

function resolveHeadingSize(size: ResponsiveHeadingSize): string {
  if (typeof size === "number") {
    return headingSizeClasses[size];
  }
  const parts: string[] = [];
  if (size.initial) {
    parts.push(headingSizeClasses[size.initial]);
  }
  for (const bp of RESPONSIVE_BREAKPOINTS) {
    const value = size[bp];
    if (value) {
      parts.push(headingSizeClassesByBreakpoint[bp][value]);
    }
  }
  return parts.join(" ");
}

function pickDefaultTagSize(size: ResponsiveHeadingSize): HeadingSize {
  if (typeof size === "number") {
    return size;
  }
  if (size.initial) {
    return size.initial;
  }
  for (const bp of RESPONSIVE_BREAKPOINTS) {
    const value = size[bp];
    if (value) {
      return value;
    }
  }
  return 2;
}

interface HeadingOwnProps {
  className?: string;
  size: ResponsiveHeadingSize;
  truncate?: boolean;
  weight?: HeadingWeight;
}

export type HeadingProps<E extends ElementType = "h1"> = HeadingOwnProps & {
  as?: E;
} & Omit<ComponentPropsWithoutRef<E>, keyof HeadingOwnProps | "as">;

export function Heading<E extends ElementType = "h1">({
  as,
  size,
  weight = "medium",
  truncate,
  className,
  ...rest
}: HeadingProps<E>): ReactElement {
  const tagSize = pickDefaultTagSize(size);
  const Component = (as ?? (`h${tagSize}` as ElementType)) as ElementType;

  return (
    <Component
      className={cn(
        resolveHeadingSize(size),
        headingWeightClasses[weight],
        truncate && "truncate",
        className
      )}
      data-heading=""
      {...rest}
    />
  );
}
