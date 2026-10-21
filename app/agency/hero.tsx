import Image from "next/image";
import Link from "next/link";
import { Caveat } from "next/font/google";
import {
  buttonPrimary,
  buttonPrimaryLarge,
  buttonSecondaryLarge,
} from "../button-styles";
import { bookCall } from "../contact";
import { LogoStack } from "./logo-stack";
import { MobileMenu } from "./mobile-menu";

const hand = Caveat({ subsets: ["latin"], weight: ["500", "600"] });


// full paths so the nav also works from /agency/projects; on /agency itself
// the browser treats them as same-page jumps. Work goes to its own page.
const NAV = [
  { label: "Agency", href: "/agency" },
  { label: "Services", href: "/agency#services" },
  { label: "Pricing", href: "/agency#pricing" },
  { label: "FAQ", href: "/agency#faq" },
  { label: "Work", href: "/agency/projects" },
];

export function AgencyNav({ active = "Agency" }: { active?: string }) {
  return (
    <header className="relative mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 pt-6">
      <Link href="/" className="font-serif text-lg tracking-tight">
        s00laimang
      </Link>
      <nav className="hidden items-center gap-0.5 rounded-[10px] bg-foreground/[0.04] p-1 text-[13px] sm:flex">
        {NAV.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={
              item.label === active
                ? "rounded-md bg-background px-3.5 py-1.5 font-medium text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)]"
                : "rounded-md px-3.5 py-1.5 text-muted transition-colors hover:text-foreground active:bg-foreground/[0.06]"
            }
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <MobileMenu items={NAV} active={active} />
        <a {...bookCall} className={buttonPrimary}>
          Book a call
        </a>
      </div>
    </header>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-[18px] fill-none stroke-current stroke-[1.7] opacity-80" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="14" height="13" rx="2.5" />
      <path d="M3 8.5h14M7 2.5v3M13 2.5v3" />
    </svg>
  );
}

// both chips are inline-blocks with clipped overflow so their baseline is
// their bottom edge, which lets one vertical-align center them on the words
const chip =
  "mx-[0.12em] inline-block size-[0.92em] overflow-hidden align-[-0.14em]";

// "wait, I've seen this somewhere": loads for a beat, like the memory
// coming back, then pops into a pair of eyes glancing around
function EyesChip() {
  return (
    <span className={`${chip} relative rounded-[0.22em] bg-foreground/[0.06] ring-1 ring-foreground/[0.06]`}>
      <span className="chip-loading absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="size-[0.48em] animate-spin text-muted motion-reduce:animate-none" fill="none" strokeWidth="3" strokeLinecap="round">
          <circle cx="12" cy="12" r="9" className="stroke-current opacity-20" />
          <path d="M21 12a9 9 0 0 0-9-9" className="stroke-current" />
        </svg>
      </span>
      <span className="chip-eyes absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="size-[0.62em]">
          <ellipse cx="7" cy="12" rx="5" ry="6" className="fill-white stroke-foreground/70" strokeWidth="1.5" />
          <ellipse cx="17" cy="12" rx="5" ry="6" className="fill-white stroke-foreground/70" strokeWidth="1.5" />
          <g className="eyes-look fill-[#21201c]">
            <circle cx="7" cy="13" r="2.4" />
            <circle cx="17" cy="13" r="2.4" />
          </g>
        </svg>
      </span>
    </span>
  );
}

const stackCard =
  "absolute inset-0 rounded-[0.2em] ring-1 ring-foreground/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.08)] " +
  "transition-transform duration-300 ease-out motion-reduce:transition-none";

// photo sits on two background-toned cards that peek out like a stack and
// fan out on hover. every layer is absolute, so the outer span has no line
// box and its baseline is its bottom edge, same as the other chips
function PhotoChip() {
  return (
    <span className="group relative mx-[0.12em] inline-block size-[0.92em] align-[-0.14em]">
      <HandNote />
      <span className={`${stackCard} translate-x-[0.2em] -translate-y-[0.02em] rotate-[14deg] bg-[color-mix(in_srgb,var(--foreground)_13%,var(--background))] group-hover:translate-x-[0.3em] group-hover:rotate-[20deg]`} />
      <span className={`${stackCard} translate-x-[0.1em] rotate-[5deg] bg-[color-mix(in_srgb,var(--foreground)_6%,var(--background))] group-hover:translate-x-[0.16em] group-hover:rotate-[9deg]`} />
      <span className={`${stackCard} -rotate-6 overflow-hidden ring-2 ring-background shadow-[0_4px_14px_rgba(0,0,0,0.18)] group-hover:-translate-x-[0.04em] group-hover:-rotate-[10deg]`}>
        <Image
          src="/profile.jpg"
          alt="Soolaiman"
          width={64}
          height={64}
          priority
          className="size-full object-cover"
        />
      </span>
    </span>
  );
}

// anchored to the photo chip so the arrow curls down onto it no matter how
// wide the badge above gets
function HandNote() {
  return (
    <div
      aria-hidden
      className={`${hand.className} pointer-events-none absolute bottom-[calc(100%-2px)] right-[calc(100%+18px)] hidden -rotate-6 items-start gap-0.5 text-[19px] font-normal leading-[1.05] tracking-normal text-muted md:flex`}
    >
      <span className="w-44 text-right">
        the dev buddy your cousin keeps promising to be
      </span>
      <svg viewBox="0 0 40 48" className="mt-2 h-12 w-10 shrink-0 fill-none stroke-current stroke-[1.6]" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 10C12 4 24 6 24 16S16 24 16 18S26 30 36 42" />
        <path d="M35 35l1 7-6.6-2.4" />
      </svg>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 pb-12 pt-20 text-center sm:px-6 sm:pt-28">
      <div>
        <span className="inline-flex items-center gap-2.5 rounded-md bg-background py-1.5 pl-2 pr-3.5 text-[13px] text-muted shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)] ring-1 ring-foreground/[0.06]">
          <LogoStack />
          6 brands people actually remember
        </span>
      </div>

      <h1 className="mt-7 max-w-4xl font-serif text-[40px] leading-[1.12] tracking-tight text-balance sm:text-6xl sm:leading-[1.08]">
        I&apos;m <PhotoChip /> the guy who turns{" "}
        <br className="hidden sm:block" />
        ‘wait, I&apos;ve seen <EyesChip /> this somewhere’{" "}
        <br className="hidden sm:block" />
        into ‘take my money’
      </h1>

      <p className="mt-6 max-w-xl text-[17px] leading-[1.7] text-muted text-balance">
        I build websites that make people buy right now.{" "}
        <br className="hidden sm:block" />
        And the ones who leave? They remember you and come back to buy.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <a {...bookCall} className={buttonPrimaryLarge}>
          <CalendarIcon />
          Book a call
        </a>
        <Link href="/agency/projects" className={buttonSecondaryLarge}>
          See all projects
          <svg viewBox="0 0 16 16" className="size-4 fill-none stroke-current stroke-[1.6] opacity-80" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
