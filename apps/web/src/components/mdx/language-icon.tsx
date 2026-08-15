import { IconCodeMedium } from "central-icons-outlined/IconCodeMedium";
import { IconReact } from "central-icons-outlined/IconReact";
import { IconTypescript } from "central-icons-outlined/IconTypescript";
import { cn } from "@/lib/utils";

function getExtension(filename: string) {
  const dot = filename.lastIndexOf(".");
  return dot >= 0 ? filename.slice(dot + 1).toLowerCase() : "";
}

export function LanguageIcon({
  className,
  filename,
}: {
  className?: string;
  filename: string;
}) {
  const extension = getExtension(filename);

  if (extension === "tsx" || extension === "jsx") {
    return <IconReact className={cn("size-4 text-[#149eca]", className)} />;
  }
  if (extension === "ts") {
    return (
      <IconTypescript className={cn("size-4 text-[#3178c6]", className)} />
    );
  }
  return (
    <IconCodeMedium className={cn("size-4 text-content-subtle", className)} />
  );
}
