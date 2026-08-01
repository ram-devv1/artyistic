"use client";

import { CheckIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
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
