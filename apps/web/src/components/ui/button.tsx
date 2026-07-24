"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  accent: "bg-blue-500 text-white hover-hover:hover:not-disabled:bg-blue-400",
  danger: "bg-red-500 text-white hover-hover:hover:not-disabled:bg-red-600",
  discord:
    "bg-[#5865F2] text-white shadow-none hover-hover:hover:not-disabled:bg-[#4f5bda]",
  fancy: "bg-fancy text-white",
  "fancy-secondary": "bg-fancy-secondary text-gray-1200",
  ghost: "bg-transparent hover-hover:hover:not-disabled:bg-gray-300",
  primary: "bg-gray-1200 text-gray-100",
  secondary:
    "bg-preview-bg text-gray-1200 shadow-custom hover-hover:hover:not-disabled:bg-gray-100",
  special:
    "bg-linear-to-b from-sky-400 to-sky-500 text-white shadow-[0px_0px_1px_1px_rgba(255,255,255,0.06)_inset,0px_1.5px_2px_0px_rgba(0,0,0,0.1),0px_0px_0px_1px_var(--color-sky-500)]",
  success:
    "bg-green-500 text-white hover-hover:hover:not-disabled:bg-green-600",
  tertiary:
    "bg-gray-300 text-gray-1100 hover-hover:hover:not-disabled:bg-gray-400",
};

const sizeClasses = {
  lg: "btn-lg",
  md: "btn-md",
  sm: "btn-sm",
  xl: "btn-xl",
  xs: "btn-xs",
};

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizeClasses;

interface ButtonBaseProps {
  children?: ReactNode;
  className?: string;
  href?: string;
  leftIcon?: ReactNode;
  native?: boolean;
  prefetch?: boolean;
  rightIcon?: ReactNode;
  rounded?: boolean;
  size?: ButtonSize;
  static?: boolean;
  variant?: ButtonVariant;
}

type ButtonProps = ButtonBaseProps &
  Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement> &
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof ButtonBaseProps
  > & {
    ref?: React.Ref<HTMLButtonElement | HTMLAnchorElement>;
  };

function ButtonContents({
  children,
  leftIcon,
  rightIcon,
}: {
  children?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}) {
  const hasLabel =
    children !== undefined && children !== null && children !== false;

  return (
    <>
      {leftIcon}
      {hasLabel ? (
        <span className="contents select-none">{children}</span>
      ) : null}
      {rightIcon}
    </>
  );
}

function buildClassName({
  variant,
  size,
  rounded,
  isStatic,
  className,
}: {
  variant: ButtonVariant;
  size: ButtonSize;
  rounded: boolean;
  isStatic: boolean;
  className?: string;
}) {
  return cn(
    "btn",
    sizeClasses[size],
    variants[variant],
    !isStatic && "btn-tap",
    rounded && "btn-rounded",
    className
  );
}

function Button({
  variant = "secondary",
  size = "md",
  leftIcon,
  rightIcon,
  rounded = false,
  static: isStatic = false,
  className,
  children,
  href,
  native,
  prefetch,
  ref,
  ...props
}: ButtonProps) {
  const sharedClassName = buildClassName({
    className,
    isStatic,
    rounded,
    size,
    variant,
  });

  const content = (
    <ButtonContents leftIcon={leftIcon} rightIcon={rightIcon}>
      {children}
    </ButtonContents>
  );

  if (href) {
    if (native) {
      return (
        <a
          className={sharedClassName}
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        className={sharedClassName}
        href={href}
        prefetch={prefetch}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={sharedClassName}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}

export type { ButtonProps, ButtonSize, ButtonVariant };
export { Button };
