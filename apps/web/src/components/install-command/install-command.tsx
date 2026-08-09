import { CopyButton } from "@/components/ui/copy-button";
import { Text } from "@/components/ui/text";

export function InstallCommand({ command }: { command: string }) {
  return (
    <div className="flex h-12 w-full items-center gap-2 rounded-2xl border border-border bg-background pr-1 pl-4">
      <Text as="span" className="font-berkeley-mono text-content-subtle">
        $
      </Text>
      <Text
        as="span"
        className="min-w-px flex-1 font-berkeley-mono text-content"
        size="sm"
      >
        {command}
      </Text>
      <CopyButton
        className="size-10 rounded-xl"
        iconClassName="size-5"
        text={command}
      />
    </div>
  );
}
