"use client";

import { useRef, useState } from "react";

export function InstallCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      return;
    }
    setCopied(true);
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex w-full items-start gap-2 rounded-[20px] bg-gray-100 px-6 py-5 text-[13px] leading-5 outline-light">
      <span className="font-berkeley-mono text-gray-1000">$</span>
      <span className="min-w-px flex-1 font-berkeley-mono text-gray-1000">
        {command}
      </span>
      <button
        className="link-outline whitespace-nowrap font-[450] text-gray-1200 transition-colors duration-150 hover:text-gray-1000"
        onClick={handleCopy}
        type="button"
      >
        {copied ? "Copied" : "Copy to clipboard"}
      </button>
    </div>
  );
}
