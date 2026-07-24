import type { ReactNode } from "react";

export function MDXCode({
  children,
  className,
  ...rest
}: {
  children: ReactNode;
  className?: string;
} & Record<string, unknown>) {
  const isBlock =
    "data-language" in rest ||
    (typeof className === "string" && className.startsWith("language-"));
  if (isBlock) {
    return (
      <code className={className} {...rest}>
        {children}
      </code>
    );
  }
  return <code className="code-inline">{children}</code>;
}
