"use client";

import { useEffect, useId, useRef, useState } from "react";
import { TextMorph } from "torph/react";

type Item = { label: string; href: string };

// idle: hidden · open: grown out · closing: running the shrink back into the
// button, then idle again. the closing phase lets the exit play before hiding
type Phase = "idle" | "open" | "closing";

// phones only: a floating "Open menu" button pinned to the bottom of the
// screen. the card starts as a small square sitting on the button, widens to
// full width, then grows up to full height; closing runs it back
export function MobileMenu({ items, active }: { items: Item[]; active: string }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const open = phase === "open";
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const close = () => setPhase((p) => (p === "open" ? "closing" : p));
  const toggle = () => setPhase((p) => (p === "open" ? "closing" : "open"));

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus({ preventScroll: true });
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setPhase("closing");
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // safety net in case the exit animation's end event never arrives
  useEffect(() => {
    if (phase !== "closing") return;
    const t = setTimeout(() => setPhase("idle"), 700);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className="sm:hidden">
      {/* dims the page behind the open menu; tapping it closes */}
      <div
        aria-hidden
        data-phase={phase}
        onClick={close}
        className="menu-backdrop fixed inset-0 z-40 bg-background/70"
      />

      <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col items-center px-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
        <div
          id={panelId}
          inert={!open || undefined}
          data-phase={phase}
          onAnimationEnd={(e) => {
            if (e.target === e.currentTarget && phase === "closing") setPhase("idle");
          }}
          className="menu-panel relative mb-3 w-full max-w-sm overflow-hidden rounded-md p-2 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35),0_4px_12px_-4px_rgba(0,0,0,0.15)] ring-1 ring-foreground/[0.08]"
          style={{ backgroundColor: "color-mix(in srgb, #7d766c 16%, var(--background))" }}
        >
          <nav aria-label="Main" className="relative flex flex-col">
            {items.map((item, i) => (
              <a
                key={item.label}
                ref={i === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={close}
                aria-current={item.label === active ? "page" : undefined}
                className="menu-item flex items-center justify-between rounded-md px-3 py-3 font-serif text-2xl tracking-tight transition-colors active:bg-foreground/[0.06] aria-[current=page]:bg-background/70"
                style={{ "--i": items.length - 1 - i } as React.CSSProperties}
              >
                {item.label}
                <svg viewBox="0 0 16 16" aria-hidden className="size-4 fill-none stroke-current stroke-[1.6] opacity-40" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            ))}
          </nav>
        </div>

        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={toggle}
          className="inline-flex cursor-pointer items-center gap-2.5 rounded-md bg-gradient-to-b from-[#4a4a48] via-[#262624] to-[#161614] px-5 py-3 text-[15px] font-medium text-white shadow-[inset_0_1.5px_0_rgba(255,255,255,0.25),inset_0_-2px_6px_rgba(0,0,0,0.5),0_10px_28px_-8px_rgba(0,0,0,0.55)] transition-transform duration-150 ease-out active:scale-[0.97] dark:from-white dark:via-[#f6f4f0] dark:to-[#eae7e1] dark:text-[#21201c] dark:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.9),inset_0_-2px_5px_rgba(0,0,0,0.08),0_10px_28px_-8px_rgba(0,0,0,0.7)]"
        >
          <span aria-hidden className="menu-icon relative block h-2.5 w-3.5" data-open={open || undefined}>
            <span className="absolute inset-x-0 top-0 h-[1.5px] rounded-full bg-current" />
            <span className="absolute inset-x-0 bottom-0 h-[1.5px] rounded-full bg-current" />
          </span>
          <TextMorph>{open ? "Close menu" : "Open menu"}</TextMorph>
        </button>
      </div>
    </div>
  );
}
