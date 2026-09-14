import type { IconProps } from "./icon-base";

export function NpmIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3 21H12V7.5H16.5V21H21V3H3V21Z" />
    </svg>
  );
}
