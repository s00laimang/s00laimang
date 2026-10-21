"use client";

import { useRef, useState } from "react";
import { TextMorph } from "torph/react";
import { buttonDark as dark, buttonLight as light } from "./button-styles";

const EMAIL = "s00laimang@icloud.com";

export function ActionButtons() {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function copyEmail() {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <button type="button" onClick={copyEmail} className={dark}>
        {copied ? (
          <svg viewBox="0 0 20 20" className="size-4 fill-none stroke-white/90 stroke-2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10.5l4 4 8-8.5" />
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" className="size-4 fill-none stroke-white/90 stroke-[1.7]" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2.5" y="4.5" width="15" height="11.5" rx="2.5" />
            <path d="M3.5 6.5l6.5 5 6.5-5" />
          </svg>
        )}
        <TextMorph>{copied ? "Copied!" : "Copy my email"}</TextMorph>
      </button>

      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={light}
      >
        <svg viewBox="0 0 20 20" className="size-4 fill-none stroke-[#21201c]/80 stroke-[1.7]" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 2.5h7l3.5 3.5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-13.5a1 1 0 0 1 1-1z" />
          <path d="M12 2.5V6h3.5" />
          <path d="M7 10h6M7 13h6" />
        </svg>
        Open Resume
      </a>
    </div>
  );
}
