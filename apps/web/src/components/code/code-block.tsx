import { CopyButton } from "@/components/ui/copy-button";
import { type CodeLine, codeText } from "@/lib/code";

const PRE_CLASSES =
  "tab-size-4 overflow-x-auto overscroll-x-contain px-4 py-3 font-paper-mono text-[13px] leading-5 [scrollbar-color:var(--color-content-subtle)_transparent] [scrollbar-width:thin] **:font-paper-mono [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-content-subtle [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1";

function Line({ line }: { line: CodeLine }) {
  if (line.length === 0) {
    return <span data-line=""> </span>;
  }

  let offset = 0;
  return (
    <span data-line="">
      {line.map((token) => {
        const start = offset;
        offset += token.text.length;
        return (
          <span key={start} style={{ color: `var(--code-${token.kind})` }}>
            {token.text}
          </span>
        );
      })}
    </span>
  );
}

export function CodeBlock({ lines }: { lines: CodeLine[] }) {
  return (
    <figure className="relative w-full">
      <CopyButton className="absolute top-2 right-2" text={codeText(lines)} />
      <pre className={PRE_CLASSES}>
        <code className="grid">
          {lines.map((line) => (
            <Line key={codeText([line])} line={line} />
          ))}
        </code>
      </pre>
    </figure>
  );
}
