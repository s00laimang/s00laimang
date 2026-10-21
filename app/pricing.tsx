import type { CSSProperties } from "react";
import { buttonPrimary, buttonSecondary } from "./button-styles";
import { GRAIN } from "./showcase";

const EMAIL = "s00laimang@icloud.com";
const INK = "#7d766c";

// PLACEHOLDER prices — swap for real ones before this goes on /agency
type Plan = {
  name: string;
  pill: string;
  from?: boolean;
  price: string;
  per: string;
  includes: string[];
  cta: string;
  subject: string;
  // the one plan the page nudges people toward
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "New website",
    pill: "2 days",
    featured: true,
    price: "$600",
    per: "one-off",
    includes: [
      "Up to 5 pages",
      "Copy written for you",
      "Quote or contact form",
      "Fast on every phone",
    ],
    cta: "Start my site",
    subject: "New website",
  },
  {
    name: "Redesign",
    pill: "About a week",
    price: "$900",
    per: "one-off",
    includes: [
      "Keep your content, lose the dated look",
      "A quote form that gets used",
      "Your Google ranking carried over",
      "Two rounds of changes",
    ],
    cta: "Redesign my site",
    subject: "Redesign",
  },
  {
    name: "Web apps & AI",
    pill: "Depends on scope",
    from: true,
    price: "$2,500",
    per: "scoped together",
    includes: [
      "A scoping call before any price",
      "Dashboards, MVPs, AI tools",
      "WhatsApp bots and automation",
      "Weekly demos while I build",
    ],
    cta: "Pitch me your idea",
    subject: "Web app",
  },
];

const ADDONS: Plan[] = [
  {
    name: "SEO & Google",
    pill: "Add to any site",
    price: "$250",
    per: "one-off",
    includes: ["Google Business Profile", "Search basics done right"],
    cta: "Get me found",
    subject: "SEO and Google",
  },
  {
    name: "Care & updates",
    pill: "Ongoing",
    price: "$99",
    per: "per month",
    includes: ["Updates and fixes", "Speed and hosting looked after"],
    cta: "Keep it running",
    subject: "Care and updates",
  },
];

// deterministic 0..1 per cell, so server and client render the same field
function noise(i: number, seed: number) {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const LEVELS = [0.07, 0.18, 0.35, 0.6, 0.95];
const level = (n: number) => LEVELS[Math.floor(n * LEVELS.length)];

function Plus() {
  return (
    <svg viewBox="0 0 10 10" className="size-full" fill="currentColor" aria-hidden>
      <rect x="4" y="0.5" width="2" height="9" rx=".4" />
      <rect x="0.5" y="4" width="9" height="2" rx=".4" />
    </svg>
  );
}

// a rectangle of "+" marks in mixed shades with a hole cut out of the middle
// for the price. each mark has a resting shade and a hover shade; hovering the
// card sweeps the change across in a left-to-right wave (globals.css .pf-cell)
export function PriceField({
  cols,
  rows,
  cut,
  seed,
  boost = 1,
  children,
}: {
  cols: number;
  rows: number;
  cut: [number, number, number, number]; // first col, last col, first row, last row
  seed: number;
  // multiplies every shade, so the featured plan's field reads a touch darker
  boost?: number;
  children: React.ReactNode;
}) {
  const [c0, c1, r0, r1] = cut;
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const hole = c >= c0 && c <= c1 && r >= r0 && r <= r1;
      cells.push(
        <span
          key={i}
          className="pf-cell block aspect-square p-[18%]"
          style={
            hole
              ? { visibility: "hidden" }
              : ({
                  "--o1": Math.min(1, level(noise(i, seed)) * boost),
                  "--o2": Math.min(1, level(noise(i, seed + 7)) * boost),
                  "--d": `${c * 22 + r * 8}ms`,
                } as CSSProperties)
          }
        >
          <Plus />
        </span>,
      );
    }
  }
  return (
    <div className="relative">
      <div
        aria-hidden
        className="grid"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {cells}
      </div>
      <div
        className="absolute flex flex-col items-center justify-center text-center"
        style={{
          left: `${(c0 / cols) * 100}%`,
          right: `${((cols - 1 - c1) / cols) * 100}%`,
          top: `${(r0 / rows) * 100}%`,
          bottom: `${((rows - 1 - r1) / rows) * 100}%`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Price({ plan, big }: { plan: Plan; big?: boolean }) {
  return (
    <>
      {plan.from && (
        <span className="text-[12px] uppercase tracking-[0.14em] text-muted">from</span>
      )}
      <span className={`font-serif leading-none tracking-tight ${big ? "text-5xl" : "text-4xl"}`}>
        {plan.price}
      </span>
      <span className="mt-1.5 text-[12px] text-muted">{plan.per}</span>
    </>
  );
}

function Card({
  plan,
  seed,
  addon,
}: {
  plan: Plan;
  seed: number;
  addon?: boolean;
}) {
  return (
    <article
      className={`price-card relative flex flex-col overflow-hidden rounded-md p-6 ${plan.featured ? "ring-2 ring-foreground/70" : "ring-1 ring-foreground/[0.06]"}`}
      style={{ backgroundColor: `color-mix(in srgb, ${INK} ${plan.featured ? 22 : 16}%, var(--background))` }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90 mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative flex items-center justify-between gap-3">
        <h3 className="font-serif text-2xl tracking-tight">{plan.name}</h3>
        {plan.featured ? (
          <span className="whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-[12px] font-medium text-background">
            Start here · {plan.pill}
          </span>
        ) : (
          <span className="whitespace-nowrap rounded-md bg-background/75 px-2.5 py-1 text-[12px] text-muted shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
            {plan.pill}
          </span>
        )}
      </div>

      <div className="relative mt-6">
        {addon ? (
          <PriceField cols={22} rows={5} cut={[6, 15, 1, 3]} seed={seed}>
            <Price plan={plan} />
          </PriceField>
        ) : (
          <PriceField cols={14} rows={9} cut={[2, 11, 2, 6]} seed={seed} boost={plan.featured ? 1.35 : 1}>
            <Price plan={plan} big />
          </PriceField>
        )}
      </div>

      <ul className="relative mt-6 space-y-2">
        {plan.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-muted">
            <span className="mt-[5px] size-2.5 shrink-0 text-foreground/50">
              <Plus />
            </span>
            {item}
          </li>
        ))}
      </ul>

      {/* pricing is where people decide, so it gets real buttons: dark on
          every plan, and the featured plan's dark card frame gets the white
          one so it stands apart */}
      <div className="relative mt-auto pt-8">
        <a
          href={`mailto:${EMAIL}?subject=${encodeURIComponent(plan.subject)}`}
          className={`${plan.featured ? buttonSecondary : buttonPrimary} group w-full justify-center`}
        >
          {plan.cta}
          <svg viewBox="0 0 16 16" className="size-3.5 fill-none stroke-current stroke-[1.6] transition-transform duration-200 ease-out group-hover:translate-x-0.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>
      </div>
    </article>
  );
}

export function PricingCards() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        {PLANS.map((plan, i) => (
          <Card key={plan.name} plan={plan} seed={i + 1} />
        ))}
      </div>
      <p className="flex items-center gap-3 pt-4 text-[12px] uppercase tracking-[0.14em] text-muted">
        Add to any plan
        <span aria-hidden className="h-px flex-1 bg-foreground/10" />
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {ADDONS.map((plan, i) => (
          <Card key={plan.name} plan={plan} seed={i + 11} addon />
        ))}
      </div>
    </div>
  );
}
