import type { ReactNode } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { FIGURE_CLASSES, PRE_CLASSES } from "@/lib/code-block";

export function CodeLine({ children }: { children: ReactNode }) {
  return <span data-line="">{children}</span>;
}

export function CodeFrame({
  children,
  text,
}: {
  children: ReactNode;
  text: string;
}) {
  return (
    <figure className={FIGURE_CLASSES}>
      <CopyButton className="absolute top-2 right-2" text={text} />
      <pre className={PRE_CLASSES}>
        <code className="grid" data-theme="light dark">
          {children}
        </code>
      </pre>
    </figure>
  );
}
