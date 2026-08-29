export const buttonVariants = {
  ghost:
    "bg-transparent text-content-subtle hover-hover:hover:not-disabled:bg-background hover-hover:hover:not-disabled:text-content",
  primary: "bg-content text-surface",
  secondary:
    "bg-popover text-content shadow-custom hover-hover:hover:not-disabled:bg-popover-hovered",
  tertiary:
    "bg-background text-content-subtle hover-hover:hover:not-disabled:bg-background-hovered hover-hover:hover:not-disabled:text-content",
};

export type ButtonVariant = keyof typeof buttonVariants;

export const BUTTON_BASE =
  "group flex shrink-0 cursor-pointer items-center justify-center transition-[scale,background-color,color] duration-200 ease-out active:scale-[0.97] will-change-transform";
