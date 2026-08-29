import type { ButtonHTMLAttributes, ReactNode } from "react";
import {
  BUTTON_BASE,
  type ButtonVariant,
  buttonVariants,
} from "@/components/ui/button-styles";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

export function Button({
  children,
  className,
  variant = "tertiary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        BUTTON_BASE,
        "h-8 gap-1.5 rounded-lg px-2.5 font-medium text-sm",
        buttonVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
