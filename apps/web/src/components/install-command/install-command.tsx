import { CopyButton } from "@/components/ui/copy-button";
import { Text } from "@/components/ui/text";

export function InstallCommand({ command }: { command: string }) {
  return (
    <div className="flex h-11 w-full items-center gap-2 rounded-2xl border border-border bg-background pr-1 pl-4">
      <Text
        as="span"
        className="font-paper-mono text-[13px] text-content-subtle"
      >
        $
      </Text>
      <Text
        as="span"
        className="min-w-px flex-1 font-paper-mono text-[13px] text-content"
      >
        {command}
      </Text>
      <CopyButton
        className="size-9 rounded-xl"
        iconClassName="size-4.5"
        text={command}
      />
    </div>
  );
}
