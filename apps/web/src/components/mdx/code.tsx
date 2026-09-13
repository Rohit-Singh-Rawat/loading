import type { ComponentPropsWithoutRef } from "react";

export function MDXCode({
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<"code">) {
  const isBlock =
    "data-language" in rest || className?.startsWith("language-") === true;
  if (isBlock) {
    return (
      <code className={className} {...rest}>
        {children}
      </code>
    );
  }
  return <code className="code-inline">{children}</code>;
}
