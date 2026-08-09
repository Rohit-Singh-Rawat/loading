import { cn } from "@/lib/utils";

const variants = {
  ghost:
    "bg-transparent text-content-subtle hover-hover:hover:not-disabled:bg-background hover-hover:hover:not-disabled:text-content",
  primary: "bg-content text-surface",
  secondary:
    "bg-popover text-content shadow-custom hover-hover:hover:not-disabled:bg-background",
  tertiary:
    "bg-background text-content-subtle hover-hover:hover:not-disabled:bg-background-hovered hover-hover:hover:not-disabled:text-content",
};

const sizes = {
  lg: "size-11",
  md: "size-10",
  sm: "size-9",
  xl: "size-12",
  xs: "size-8",
  xxs: "size-7",
};

type IconButtonVariant = keyof typeof variants;
type IconButtonSize = keyof typeof sizes;

type IconButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-label"
> & {
  "aria-label": string;
  children: React.ReactNode;
  rounded?: boolean;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
};

export default function IconButton({
  children,
  className,
  rounded = false,
  size = "md",
  variant = "tertiary",
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(
        "group flex shrink-0 cursor-pointer items-center justify-center",
        rounded ? "rounded-full" : "rounded-lg",
        sizes[size],
        variants[variant],
        "transition-[scale,background-color,color] duration-200 ease-out",
        "active:scale-[0.97]",
        "will-change-transform",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
