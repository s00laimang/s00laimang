"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { TextMorph } from "torph/react";

const SHIPPED = [
  { name: "askOga", icon: "/logos/askoga.png", href: "https://askoga.vercel.app" },
  { name: "Payfrica", icon: "/logos/payfrica.png", href: "https://payfrica.xyz" },
  { name: "Kinta SME", icon: "/logos/kintasme.ico", href: "https://kinta-sme.com" },
  { name: "Resellos", icon: "/logos/resellos.svg", href: "https://resellos.site" },
  { name: "Loota", icon: "/logos/loota.png", href: "https://loota.site" },
  { name: "Voultron", icon: "/logos/voultron.svg", href: "https://voultron.fun" },
];

// overlapping logos like an avatar group with one shared tooltip: it glides
// to whichever logo is hovered and morphs its label, instead of each logo
// fading its own tooltip in and out
export function LogoStack() {
  const logoRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [x, setX] = useState(0);
  // when the tooltip appears from hidden it should land on the logo, not
  // slide in from wherever it was last
  const [snap, setSnap] = useState(true);

  function show(i: number) {
    const el = logoRefs.current[i];
    if (!el) return;
    setSnap(active === null);
    setX(el.offsetLeft + el.offsetWidth / 2);
    setActive(i);
  }

  return (
    <span
      className="relative flex items-center -space-x-1.5"
      onMouseLeave={() => setActive(null)}
    >
      {SHIPPED.map((item, i) => (
        <a
          key={item.name}
          ref={(el) => {
            logoRefs.current[i] = el;
          }}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
          onMouseEnter={() => show(i)}
          onFocus={() => show(i)}
          onBlur={() => setActive(null)}
          className="group/logo relative hover:z-10 focus-visible:z-10"
        >
          <span className="flex size-6 items-center justify-center rounded-md bg-background shadow-[0_1px_3px_rgba(0,0,0,0.12)] ring-2 ring-background transition-transform duration-200 ease-out group-hover/logo:-translate-y-0.5 group-hover/logo:scale-125 group-focus-visible/logo:scale-125">
            <Image
              src={item.icon}
              alt=""
              width={16}
              height={16}
              unoptimized
              className="size-4 rounded-[3px] object-contain"
            />
          </span>
        </a>
      ))}

      <span
        aria-hidden
        data-snap={snap || undefined}
        className="tip-x pointer-events-none absolute bottom-full left-0 z-20 mb-2.5"
        style={{ transform: `translateX(${x}px)` }}
      >
        <span
          data-open={active !== null || undefined}
          className="tip-body relative block -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2.5 py-0.5 font-serif text-[14px] tracking-tight text-background shadow-md"
        >
          <TextMorph>{SHIPPED[active ?? 0].name}</TextMorph>
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-foreground" />
        </span>
      </span>
    </span>
  );
}
