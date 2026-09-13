import {
  BUTTON_BASE,
  type ButtonVariant,
  buttonVariants,
} from "@/components/ui/button-styles";
import { cn } from "@/lib/utils";

const sizes = {
  lg: "size-11",
  md: "size-10",
  sm: "size-9",
  xl: "size-12",
  xs: "size-8",
  xxs: "size-7",
};

type IconButtonSize = keyof typeof sizes;

type IconButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-label"
> & {
  "aria-label": string;
  children: React.ReactNode;
  rounded?: boolean;
  size?: IconButtonSize;
  variant?: ButtonVariant;
};

export function IconButton({
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
        BUTTON_BASE,
        rounded ? "rounded-full" : "rounded-lg",
        sizes[size],
        buttonVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
