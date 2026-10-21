"use client";

import Image from "next/image";
import { useState } from "react";
import { buttonPrimary } from "./button-styles";
import { bookCall } from "./contact";
import { GRAIN } from "./showcase";


// answers marked PLACEHOLDER are promises to clients: confirm before launch
const FAQS = [
  {
    q: "How much does a website cost?",
    a: "Everything is on the price list above. Sites and redesigns are fixed prices, so the number you see is the number you pay. Web apps get scoped together before there's any price at all.",
  },
  {
    q: "Can you really build a site in 2 days?",
    a: "Yes. Once I have your logo, a few photos and a quick call, I design, write and build it in two working days. Redesigns and bigger sites take about a week.",
  },
  {
    q: "What do you need from me?",
    a: "Your logo if you have one, some photos of your work, and about 20 minutes on a call so I understand the business. I write the words for you.",
  },
  {
    q: "I already have a site. Do I have to start over?",
    a: "No. A redesign keeps your content, your domain and the Google ranking you've already built. People just stop leaving.",
  },
  {
    q: "Will people actually find me on Google?",
    a: "Every site ships with the search basics done right. For local businesses I can also set up your Google Business Profile, so you show up on the map when people search nearby.",
  },
  {
    // PLACEHOLDER: confirm ownership terms
    q: "Who owns the website?",
    a: "You do. The domain, the code and every account are in your name, so you're never stuck with me.",
  },
  {
    // PLACEHOLDER: confirm number of revision rounds
    q: "What if I don't like the design?",
    a: "Then we change it. You see the design before I build anything, and two rounds of changes are included.",
  },
  {
    q: "What happens after launch?",
    a: "I don't disappear. Keep me on Care & updates for fixes and changes, or take the keys and run it yourself. Either way you can still message me.",
  },
  {
    q: "Do you work with businesses outside Nigeria?",
    a: "Yes. Calls, previews and payments all happen online, so where you are doesn't matter. We just find an hour that works for both of us.",
  },
  {
    // PLACEHOLDER: confirm payment terms
    q: "How do payments work?",
    a: "Half to start, half when you're happy with the site. No hidden fees, no surprise invoices.",
  },
];

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className={`size-4 shrink-0 fill-none stroke-current stroke-[1.6] text-muted transition-[rotate,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:text-foreground motion-reduce:transition-none ${open ? "rotate-45 text-foreground" : ""}`}
      strokeLinecap="round"
    >
      <path d="M8 2.5v11M2.5 8h11" />
    </svg>
  );
}

// one answer opens by grid rows going 0fr → 1fr, the accordion-safe way to
// animate height, with a short fade so the text doesn't just appear
function Item({
  index,
  q,
  a,
  open,
  onToggle,
}: {
  index: number;
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  const id = `faq-${index}`;
  return (
    // each question is its own warm-ink card; an open card deepens a shade
    <div
      className="relative overflow-hidden rounded-md ring-1 ring-foreground/[0.06] transition-[background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
      style={{
        backgroundColor: `color-mix(in srgb, #7d766c ${open ? 22 : 14}%, var(--background))`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90 mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />
      <h3 className="relative">
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="group flex w-full cursor-pointer items-center justify-between gap-6 px-5 py-4 text-left transition-colors hover:bg-foreground/[0.03] active:bg-foreground/[0.06]"
        >
          <span className="font-serif text-xl tracking-tight">{q}</span>
          <PlusIcon open={open} />
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        className={`relative grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 pr-14 text-[15px] leading-[1.7] text-muted">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <>
      <h2 className="text-center font-serif text-4xl tracking-tight">
        Questions people actually ask
      </h2>

      <div className="mt-10 space-y-2">
        {FAQS.map((item, i) => (
          <Item
            key={item.q}
            index={i}
            q={item.q}
            a={item.a}
            open={open.has(i)}
            onToggle={() => toggle(i)}
          />
        ))}

        {/* the last card answers every question that isn't listed */}
        <div
          className="relative overflow-hidden rounded-md p-5 ring-1 ring-foreground/[0.06] sm:p-6"
          style={{ backgroundColor: "color-mix(in srgb, #7d766c 22%, var(--background))" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-90 mix-blend-overlay"
            style={{ backgroundImage: GRAIN }}
          />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/profile.jpg"
                alt=""
                width={48}
                height={48}
                className="size-12 shrink-0 rounded-md object-cover"
              />
              <div>
                <p className="font-serif text-xl leading-tight tracking-tight">
                  Still unsure? Ask me directly.
                </p>
                <p className="mt-1 text-[14px] leading-[1.6] text-muted">
                  Tell me about your business and I&apos;ll tell you honestly
                  what you need. No pressure, no sales script.
                </p>
              </div>
            </div>
            <a
              {...bookCall}
              className={`${buttonPrimary} shrink-0 justify-center`}
            >
              Book a call
              <svg viewBox="0 0 16 16" className="size-3.5 fill-none stroke-current stroke-[1.6]" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
