"use client";

import { CheckIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

import { clearCopyReset, scheduleCopyReset } from "@/components/copy-reset-timer";

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => clearCopyReset(resetTimer), []);

  async function copy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    scheduleCopyReset(resetTimer, () => setCopied(false));
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="copy-button"
      data-copied={copied}
    >
      {copied ? <CheckIcon aria-hidden="true" className="h-4 w-4" /> : <ClipboardDocumentIcon aria-hidden="true" className="h-4 w-4" />}
      <span className="copy-button__text" aria-live="polite" aria-atomic="true">
        <span className="copy-button__sizer">Copy command</span>
        <span>{copied ? "Copied" : "Copy command"}</span>
      </span>
    </button>
  );
}
