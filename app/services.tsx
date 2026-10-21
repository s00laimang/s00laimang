import type { CSSProperties } from "react";
import { GRAIN } from "./showcase";

const EMAIL = "s00laimang@icloud.com";

type Shape = "blocks" | "browser" | "orbit" | "bars" | "moons" | "question";

type Service = {
  title: string;
  pill: string;
  body: string;
  cta: string;
  subject: string;
  hue: string;
  shape: Shape;
};

const SERVICES: Service[] = [
  {
    title: "Redesigns",
    pill: "About a week",
    body: "Your site is old, slow or forgettable. I rebuild it so people remember you, and the quote form actually gets used.",
    cta: "Redesign my site",
    subject: "Redesign",
    hue: "#e0844a",
    shape: "blocks",
  },
  {
    title: "New websites",
    pill: "2 days",
    body: "No site, or just a Facebook page? Two days later you have one that looks premium and brings in enquiries.",
    cta: "Start my site",
    subject: "New website",
    hue: "#4a7fd6",
    shape: "browser",
  },
  {
    title: "Web apps & AI",
    pill: "Depends on scope",
    body: "Dashboards, MVPs, AI tools and WhatsApp bots. For when a website isn't enough and the idea is bigger.",
    cta: "Pitch me your idea",
    subject: "Web app",
    hue: "#8a6fd4",
    shape: "orbit",
  },
  {
    title: "SEO & Google",
    pill: "Add to any site",
    body: "Show up when people search “cleaner near me”. Google Business Profile, search basics and the boring stuff done right.",
    cta: "Get me found",
    subject: "SEO and Google",
    hue: "#3b9463",
    shape: "bars",
  },
  {
    title: "Care & updates",
    pill: "Ongoing",
    body: "I don't disappear after launch. Updates, fixes, speed and hosting, so your site keeps working while you do.",
    cta: "Keep it running",
    subject: "Care and updates",
    hue: "#8a8378",
    shape: "moons",
  },
  {
    title: "Not sure yet?",
    pill: "No pressure",
    body: "Tell me about your business and I'll tell you what you actually need. Sometimes it's less than you think.",
    cta: "Just book a call",
    subject: "Quick call",
    hue: "#d0457f",
    shape: "question",
  },
];

const light = (hue: string, pct: number) =>
  `color-mix(in srgb, ${hue}, white ${pct}%)`;
const dark = (hue: string, pct: number) =>
  `color-mix(in srgb, ${hue}, black ${pct}%)`;

// a lit, three-tone fill that dissolves toward one edge instead of ending
// on a hard line, so each block reads as soft and dimensional
function solid(hue: string, angle = 150): CSSProperties {
  const mask = `linear-gradient(${angle}deg, black 35%, transparent 100%)`;
  return {
    background: `linear-gradient(${angle}deg, ${light(hue, 40)} 0%, ${hue} 45%, ${dark(hue, 18)} 100%)`,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
    maskImage: mask,
    WebkitMaskImage: mask,
  };
}

// shaded like a sphere: highlight up-left, falling into shadow down-right
function sphere(hue: string): CSSProperties {
  return {
    background: `radial-gradient(circle at 30% 26%, ${light(hue, 60)} 0%, ${light(hue, 15)} 28%, ${hue} 55%, ${dark(hue, 28)} 100%)`,
  };
}

// where a piece goes when its card is hovered; globals.css reads these
// (svc-move / svc-scale / svc-turn) so every card shares one motion system
function hover(h: {
  x?: number;
  y?: number;
  s?: number;
  r?: number;
  delay?: number;
}): CSSProperties {
  return {
    "--hx": `${h.x ?? 0}px`,
    "--hy": `${h.y ?? 0}px`,
    "--hs": h.s ?? 1,
    "--hr": `${h.r ?? 0}deg`,
    "--hd": `${h.delay ?? 0}ms`,
  } as CSSProperties;
}

function Shapes({ shape, hue }: { shape: Shape; hue: string }) {
  const block = "absolute rounded-md";
  switch (shape) {
    case "blocks":
      // four slanted blocks, a "before → after" shuffle; on hover they lift
      // apart like pieces about to be rearranged
      return (
        <>
          {[
            ["10%", "10%", -5, -4],
            ["56%", "10%", 5, -4],
            ["10%", "54%", -5, 4],
            ["56%", "54%", 5, 4],
          ].map(([left, top, x, y], i) => (
            <span
              key={`${left}${top}`}
              className={`${block} svc-move`}
              style={{
                ...hover({ x: x as number, y: y as number, delay: i * 40 }),
                left,
                top,
                width: "38%",
                height: "36%",
                transform: "skewX(-16deg)",
                ...solid(hue, i % 2 ? 210 : 150),
              }}
            />
          ))}
        </>
      );
    case "browser":
      // a page being laid out: header bar, hero block, two side blocks
      return (
        <>
          <span className={`${block} svc-move`} style={{ left: "6%", top: "12%", width: "100%", height: "11%", ...solid(hue, 90), ...hover({ x: -8 }) }} />
          <span className={`${block} svc-move`} style={{ left: "6%", top: "29%", width: "54%", height: "58%", ...solid(hue, 160), ...hover({ y: -5, delay: 50 }) }} />
          <span className={`${block} svc-move`} style={{ left: "66%", top: "29%", width: "40%", height: "26%", ...solid(hue, 160), ...hover({ x: -6, delay: 100 }) }} />
          <span className={`${block} svc-move`} style={{ left: "66%", top: "61%", width: "40%", height: "26%", ...solid(hue, 160), ...hover({ x: -6, delay: 150 }) }} />
        </>
      );
    case "orbit":
      // concentric rings around a lit core, like the reference's eye
      return (
        <span className="absolute left-[10%] top-1/2 aspect-square w-[120%] -translate-y-1/2">
          {[1, 0.7, 0.42].map((size, i) => (
            <span
              key={size}
              className="svc-scale absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                ...hover({ s: [1.04, 1.08, 1.14][i], delay: (2 - i) * 60 }),
                width: `${size * 100}%`,
                height: `${size * 100}%`,
                background: `radial-gradient(circle at 40% 38%, ${light(hue, 70 - i * 15)} 0%, ${light(hue, 30 - i * 10)} 45%, ${hue}${i === 0 ? "80" : "cc"} 100%)`,
                boxShadow: `0 10px 30px -12px ${dark(hue, 30)}`,
              }}
            />
          ))}
        </span>
      );
    case "bars":
      // rankings going up, each bar lit from the top
      return (
        <>
          {[30, 48, 66, 86].map((h, i) => (
            <span
              key={h}
              className={`${block} svc-move`}
              style={{
                ...hover({ y: -(6 + i * 4), delay: i * 50 }),
                left: `${10 + i * 23}%`,
                bottom: "-4%",
                width: "17%",
                height: `${h}%`,
                ...solid(hue, 180),
              }}
            />
          ))}
        </>
      );
    case "moons":
      // steady, looked-after: shaded spheres tucked against the edge
      return (
        <>
          <span className="svc-turn absolute -right-[22%] top-[6%] aspect-square w-[78%] rounded-full" style={{ ...sphere(hue), ...hover({ r: 40 }) }} />
          <span className="svc-move absolute left-[12%] top-[44%] aspect-square w-[42%] rounded-full" style={{ ...sphere(hue), ...hover({ x: 4, y: -8, delay: 60 }) }} />
          <span className="svc-move absolute -bottom-[18%] left-[52%] aspect-square w-[46%] rounded-full" style={{ ...sphere(hue), ...hover({ y: -10, delay: 120 }) }} />
        </>
      );
    case "question":
      return (
        <span
          className="svc-move svc-turn absolute -bottom-[0.17em] right-[4%] font-serif text-[300px] leading-none"
          style={{
            ...hover({ y: -14, r: 8 }),
            transformOrigin: "50% 85%",
            backgroundImage: `linear-gradient(170deg, ${light(hue, 35)} 0%, ${hue} 45%, ${dark(hue, 20)} 75%, ${hue}1a 100%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: `drop-shadow(0 12px 24px ${hue}40)`,
          }}
        >
          ?
        </span>
      );
  }
}

// the card's graphic in miniature, so the badge says which card it belongs to
function PillIcon({ shape, hue }: { shape: Shape; hue: string }) {
  const svg = "size-3.5 shrink-0";
  switch (shape) {
    case "blocks":
      return (
        <svg viewBox="0 0 14 14" className={svg} fill={hue} aria-hidden>
          <path d="M3 1.5h3.6l-1.4 4.5H1.6z" />
          <path d="M8.6 1.5h3.6l-1.4 4.5H7.2z" opacity=".6" />
          <path d="M3 8h3.6l-1.4 4.5H1.6z" opacity=".6" />
          <path d="M8.6 8h3.6l-1.4 4.5H7.2z" />
        </svg>
      );
    case "browser":
      return (
        <svg viewBox="0 0 14 14" className={svg} fill={hue} aria-hidden>
          <rect x="1" y="1.5" width="12" height="2.5" rx=".8" opacity=".6" />
          <rect x="1" y="5.5" width="6.5" height="7" rx=".8" />
          <rect x="8.5" y="5.5" width="4.5" height="3" rx=".8" opacity=".6" />
          <rect x="8.5" y="9.5" width="4.5" height="3" rx=".8" opacity=".6" />
        </svg>
      );
    case "orbit":
      return (
        <svg viewBox="0 0 14 14" className={svg} fill={hue} aria-hidden>
          <circle cx="7" cy="7" r="6" opacity=".3" />
          <circle cx="7" cy="7" r="4.2" opacity=".55" />
          <circle cx="7" cy="7" r="2.3" />
        </svg>
      );
    case "bars":
      return (
        <svg viewBox="0 0 14 14" className={svg} fill={hue} aria-hidden>
          <rect x="1" y="9" width="2.2" height="4" rx=".6" opacity=".45" />
          <rect x="4.4" y="6.5" width="2.2" height="6.5" rx=".6" opacity=".65" />
          <rect x="7.8" y="4" width="2.2" height="9" rx=".6" opacity=".85" />
          <rect x="11.2" y="1" width="2.2" height="12" rx=".6" />
        </svg>
      );
    case "moons":
      return (
        <svg viewBox="0 0 14 14" className={svg} fill={hue} aria-hidden>
          <circle cx="9.6" cy="4.4" r="3.4" />
          <circle cx="3.6" cy="8.2" r="2.2" opacity=".7" />
          <circle cx="9.4" cy="11.4" r="2" opacity=".5" />
        </svg>
      );
    case "question":
      return (
        <span aria-hidden className="w-3.5 shrink-0 text-center font-serif text-[15px] font-semibold leading-none" style={{ color: hue }}>
          ?
        </span>
      );
  }
}

function ServiceCard({
  service,
  square,
  showCta = true,
}: {
  service: Service;
  square?: boolean;
  showCta?: boolean;
}) {
  const { title, pill, body, cta, subject, hue, shape } = service;
  return (
    <article
      className={`svc-card relative flex min-h-[300px] flex-col overflow-hidden rounded-md p-6 ring-1 ring-foreground/[0.06] sm:p-8 ${square ? "aspect-square" : ""}`}
      style={{ backgroundColor: `color-mix(in srgb, ${hue} 16%, var(--background))` }}
    >
      <div
        aria-hidden
        className="svc-glow pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(55% 75% at 82% 50%, ${hue}40, transparent 70%)` }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-[40%]">
        <Shapes shape={shape} hue={hue} />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90 mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      <span className="relative inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-md bg-background/75 px-3 py-1.5 text-[13px] text-muted shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
        <PillIcon shape={shape} hue={hue} />
        {pill}
      </span>

      <h3 className={`relative font-serif tracking-tight ${square ? "mt-auto text-5xl" : "mt-10 text-3xl"}`}>{title}</h3>
      <p className={`relative mt-2 max-w-[60%] leading-[1.6] text-muted ${square ? "text-[17px]" : "text-[15px]"}`}>
        {body}
      </p>

      {showCta && (
        <a
          href={`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`}
          className={`group relative inline-flex w-fit items-center gap-2 border-b border-foreground/60 pb-0.5 text-[14px] font-medium transition-colors hover:border-foreground ${square ? "mt-10" : "mt-auto pt-8"}`}
        >
          {cta}
          <svg viewBox="0 0 16 16" className="size-3.5 fill-none stroke-current stroke-[1.6] transition-transform duration-200 ease-out group-hover:translate-x-0.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>
      )}
    </article>
  );
}

// palettes for the whole grid: "color" gives each service its own hue,
// the others paint every card in one shared tone so the section stays calm
// next to the colourful project marquee
export const SERVICE_TONES = {
  color: null,
  ink: "#7d766c",
  sky: "#3d8fd6",
} as const;

export const SERVICE_COUNT = SERVICES.length;

export function ServiceCards({
  tone = "color",
  columns = 2,
  only,
  square,
  ctas = true,
}: {
  tone?: keyof typeof SERVICE_TONES;
  columns?: 1 | 2 | 3;
  // index of a single card to render, for share images
  only?: number;
  // 1:1 cards, so multi-image social posts don't crop them
  square?: boolean;
  // on /agency the pricing cards carry the buttons, so services can hide
  // theirs; "Not sure yet?" keeps its call link since that is its whole job
  ctas?: boolean;
}) {
  const shared = SERVICE_TONES[tone];
  const list = only === undefined ? SERVICES : SERVICES.slice(only, only + 1);
  const cols =
    columns === 3 ? "md:grid-cols-3" : columns === 2 ? "md:grid-cols-2" : "";
  return (
    <div className={`grid gap-4 ${cols}`}>
      {list.map((service) => (
        <ServiceCard
          key={service.title}
          square={square}
          showCta={ctas || service.shape === "question"}
          service={shared ? { ...service, hue: shared } : service}
        />
      ))}
    </div>
  );
}
