import { LanguageIcon } from "@/components/mdx/language-icon";
import { CopyButton } from "@/components/ui/copy-button";

export function CodeBlockHeader({
  code,
  filename,
}: {
  code: string;
  filename: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2 border-border border-b py-1.5 pr-1.5 pl-4">
      <div className="flex min-w-0 items-center gap-2">
        <LanguageIcon className="shrink-0" filename={filename} />
        <span className="truncate font-berkeley-mono text-[13px] text-content-subtle">
          {filename}
        </span>
      </div>
      <CopyButton className="rounded-[10px]" text={code} />
    </div>
  );
}
