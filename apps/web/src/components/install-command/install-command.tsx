import { CopyButton } from "@/components/ui/copy-button";
import { Text } from "@/components/ui/text";

export function InstallCommand({ command }: { command: string }) {
  return (
    <div className="flex h-11 w-full items-center gap-2 rounded-full bg-preview-bg pr-1 pl-5 shadow-custom">
      <Text as="span" className="font-berkeley-mono text-gray-1000">
        $
      </Text>
      <Text
        as="span"
        className="min-w-px flex-1 font-berkeley-mono text-gray-1200"
        size="sm"
      >
        {command}
      </Text>
      <CopyButton
        className="size-9"
        iconClassName="size-4.5"
        rounded="full"
        text={command}
      />
    </div>
  );
}
