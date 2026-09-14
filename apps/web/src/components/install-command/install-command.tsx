import { CopyButton } from "@/components/ui/copy-button";
import { Text } from "@/components/ui/text";

export function InstallCommand({ command }: { command: string }) {
  const [manager, action, ...packages] = command.split(" ");

  return (
    <div className="flex h-12 w-full items-center gap-2 rounded-2xl border border-border bg-background-subtle pr-1 pl-4">
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
        <span className="text-[light-dark(#6437da,#9d72ff)]">{manager}</span>{" "}
        {action}{" "}
        <span className="text-[light-dark(#36833e,#73d272)]">
          {packages.join(" ")}
        </span>
      </Text>
      <CopyButton
        className="size-10 rounded-xl"
        iconClassName="size-4.5"
        text={command}
      />
    </div>
  );
}
