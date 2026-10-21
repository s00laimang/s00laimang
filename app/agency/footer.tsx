"use client";

import { useRef, useState } from "react";
import { TextMorph } from "torph/react";
import { buttonPrimaryLarge, buttonSecondaryLarge } from "../button-styles";
import { EMAIL, bookCall } from "../contact";
import { GRAIN } from "../showcase";


const EXPLORE = [
  { label: "Services", href: "/agency#services" },
  { label: "Pricing", href: "/agency#pricing" },
  { label: "FAQ", href: "/agency#faq" },
  { label: "Work", href: "/agency/projects" },
];

const ELSEWHERE = [
  { label: "X", href: "https://x.com/s00laimang" },
  { label: "Instagram", href: "https://www.instagram.com/s00laimang" },
  { label: "Snapchat", href: "https://snapchat.com/t/e3byzu7q" },
  { label: "GitHub", href: "https://github.com/s00laimang" },
];

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[12px] uppercase tracking-[0.14em] text-muted">{title}</p>
      <ul className="mt-4 space-y-2.5 text-[15px]">{children}</ul>
    </div>
  );
}

const linkClass =
  "text-foreground/80 underline decoration-transparent underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/40";

function NigeriaFlag() {
  return (
    <svg viewBox="0 0 24 16" aria-label="Nigerian flag" className="inline-block h-[11px] w-[17px] rounded-[2px] align-[-1px]">
      <rect width="8" height="16" fill="#008751" />
      <rect x="8" width="8" height="16" fill="#f5f3ef" />
      <rect x="16" width="8" height="16" fill="#008751" />
    </svg>
  );
}

// closing card: one last call to action that echoes the hero, the useful
// links, and a giant wordmark cropped by the card edge that peeks up on hover
export function AgencyFooter() {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function copyEmail() {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <footer className="mx-auto w-full max-w-5xl px-6 pb-28 sm:pb-8">
      <div
        className="footer-card relative overflow-hidden rounded-md px-6 pt-12 ring-1 ring-foreground/[0.06] sm:px-12 sm:pt-16"
        style={{ backgroundColor: "color-mix(in srgb, #7d766c 16%, var(--background))" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90 mix-blend-overlay"
          style={{ backgroundImage: GRAIN }}
        />

        <div className="relative">
          <h2 className="max-w-2xl font-serif text-4xl leading-[1.08] tracking-tight text-balance sm:text-5xl">
            Let&apos;s make them say &lsquo;take my money&rsquo;.
          </h2>
          <p className="mt-4 max-w-md text-[17px] leading-[1.7] text-muted">
            Tell me what you sell. I&apos;ll handle the rest.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a {...bookCall} className={buttonPrimaryLarge}>
              Book a call
              <svg viewBox="0 0 16 16" className="size-4 fill-none stroke-current stroke-[1.6] opacity-80" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
            <button type="button" onClick={copyEmail} className={buttonSecondaryLarge}>
              <TextMorph>{copied ? "Copied!" : "Copy my email"}</TextMorph>
            </button>
          </div>
        </div>

        <div className="relative mt-16 grid gap-10 border-t border-foreground/10 pt-10 sm:grid-cols-3">
          <Column title="Explore">
            {EXPLORE.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </Column>
          <Column title="Elsewhere">
            {ELSEWHERE.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </Column>
          <Column title="Say hi">
            <li>
              <a href={`mailto:${EMAIL}`} className={linkClass}>
                {EMAIL}
              </a>
            </li>
            <li className="text-muted">
              Based in Nigeria <NigeriaFlag />
              <br />
              working worldwide
            </li>
          </Column>
        </div>

        {/* cropped by the card's bottom edge; lifts a little on hover */}
        <p
          aria-hidden
          className="footer-wordmark relative mt-12 select-none whitespace-nowrap text-center font-serif leading-[0.8] tracking-tight text-foreground/[0.09]"
          style={{ fontSize: "clamp(4.5rem, 17vw, 13.5rem)", marginBottom: "-0.2em" }}
        >
          s00laimang
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 px-1 text-[13px] text-muted">
        <span>© {new Date().getFullYear()} s00laimang. Built by me, obviously.</span>
        <a href="#" className="transition-colors hover:text-foreground">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
