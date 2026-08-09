import { CopyButton } from "@/components/ui/copy-button";

export function CodeBlockHeader({
  code,
  filename,
}: {
  code: string;
  filename: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2 border-preview-border border-b py-1.5 pr-1.5 pl-4">
      <span className="truncate font-berkeley-mono text-gray-1100 text-sm">
        {filename}
      </span>
      <CopyButton text={code} />
    </div>
  );
}
