import Image from "next/image";
import Link from "next/link";
import { ViewTransition, type CSSProperties } from "react";

export type Project = {
  name: string;
  url: string;
  shot: string;
  // intrinsic size of the screenshot file, so next/image keeps its ratio
  size: [number, number];
  line: string;
  // a = light accent, b = deep accent, base = card floor for the gradient look
  palette: { a: string; b: string; base: string };
};

export const PROJECTS: Record<string, Project> = {
  askoga: {
    name: "askOga",
    url: "askoga.vercel.app",
    shot: "/screenshots/askoga-home.png",
    size: [1920, 1200],
    line: "Tells creators exactly what to post today",
    palette: { a: "#f7a64a", b: "#b3381b", base: "#2b1a10" },
  },
  payfrica: {
    name: "Payfrica",
    url: "payfrica.xyz",
    shot: "/screenshots/payfrica.webp",
    size: [1903, 1200],
    line: "Crypto to Naira, $30K settled so far",
    palette: { a: "#e8573a", b: "#7a1d10", base: "#f1ddd5" },
  },
  kintasme: {
    name: "Kinta SME",
    url: "kinta-sme.com",
    shot: "/screenshots/kintasme.png",
    size: [2880, 1800],
    line: "Thousands of people buy data and airtime here",
    palette: { a: "#5cc46a", b: "#0b5d1e", base: "#d7ecd9" },
  },
  resellos: {
    name: "Resellos",
    url: "resellos.site",
    shot: "/screenshots/resellos-home.png",
    size: [1920, 1200],
    line: "Anyone can launch their own VTU website in minutes",
    palette: { a: "#ff7a3d", b: "#b3360a", base: "#fbe3d6" },
  },
  dreamclean: {
    name: "The Dream Clean Agency",
    url: "thedreamcleanagency.s00laimang.com",
    shot: "/screenshots/dreamclean-home.webp",
    size: [1902, 1197],
    line: "Melbourne cleaners, quotes in one flow",
    palette: { a: "#d0457f", b: "#1f2442", base: "#f5e4ea" },
  },
  virzi: {
    name: "Virzi Projects",
    url: "virziprojects.s00laimang.com",
    shot: "/screenshots/virzi-home.webp",
    size: [1920, 1200],
    line: "Renovations to new builds, the work up front",
    palette: { a: "#d08a4a", b: "#0f1c20", base: "#1b1713" },
  },
  brisbanepartyhire: {
    name: "Brisbane Party Hire",
    url: "brisbanepartyhire.s00laimang.com",
    shot: "/screenshots/brisbanepartyhire-home.png",
    size: [2880, 1800],
    line: "Marquees and party gear, delivered and set up",
    palette: { a: "#f5892a", b: "#163e8f", base: "#1d4596" },
  },
  loota: {
    name: "Loota",
    url: "loota.site",
    shot: "/screenshots/loota-home.png",
    size: [1903, 1200],
    line: "Find anything near you, right inside WhatsApp",
    palette: { a: "#2fbf62", b: "#0d5c2c", base: "#dcefe2" },
  },
  voultron: {
    name: "Voultron",
    url: "voultron.fun",
    shot: "/screenshots/voultron.webp",
    size: [1920, 1200],
    line: "Multiplayer Panther Wheel, live on Sui",
    palette: { a: "#2fd6d6", b: "#1a2bd6", base: "#0e1430" },
  },
};

// fractal noise tile, laid over the gradient so it reads like printed paper
export const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const DEFAULT_SIZES = "(min-width: 768px) 760px, 95vw";

function BrowserFrame({
  project,
  sizes = DEFAULT_SIZES,
}: {
  project: Project;
  sizes?: string;
}) {
  return (
    <div className="overflow-hidden rounded-md bg-white shadow-[0_24px_60px_-12px_rgba(0,0,0,0.35),0_8px_20px_-8px_rgba(0,0,0,0.2)] ring-1 ring-black/10">
      <div className="flex items-center gap-3 border-b border-black/[0.06] bg-[#f6f5f3] px-3 py-2">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto truncate rounded-md bg-black/[0.05] px-3 py-0.5 font-mono text-[10px] text-black/50">
          {project.url}
        </span>
        <span className="w-[42px]" />
      </div>
      <Image
        src={project.shot}
        alt={`${project.name} homepage`}
        width={project.size[0]}
        height={project.size[1]}
        quality={90}
        sizes={sizes}
        className="block h-auto w-full"
      />
    </div>
  );
}

// the frame starts inset from the top-left and runs off the right and bottom
// edges, so it reads as sitting on the backdrop rather than pasted into it
function Stage({
  project,
  style,
  sizes,
  href,
  morphName,
  children,
}: {
  project: Project;
  style?: CSSProperties;
  sizes?: string;
  // when set, the whole card links to the project's story; the window lifts
  // a little and an arrow nudges on hover
  href?: string;
  // same name on the card and on the story page's big card, so navigating
  // between them morphs one into the other instead of cutting
  morphName?: string;
  children?: React.ReactNode;
}) {
  const stage = (
    <div
      className="relative aspect-[16/11] overflow-hidden rounded-md ring-1 ring-foreground/[0.06]"
      style={style}
    >
      {children}
      <div
        className={`absolute -right-[3%] left-[7%] top-[9%] ${href ? "transition-[translate] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1.5 motion-reduce:transition-none" : ""}`}
      >
        <BrowserFrame project={project} sizes={sizes} />
      </div>
    </div>
  );
  const figure = (
    <figure>
      {morphName ? (
        <ViewTransition name={morphName} share="morph" default="none">
          {stage}
        </ViewTransition>
      ) : (
        stage
      )}
      <figcaption className="mt-3 flex items-baseline justify-between gap-4 px-1">
        <span className="inline-flex shrink-0 items-center gap-1.5 font-serif text-lg tracking-tight">
          {project.name}
          {href && (
            <svg viewBox="0 0 16 16" aria-hidden className="size-3.5 fill-none stroke-current stroke-[1.6] opacity-50 transition-[translate,opacity] duration-200 ease-out group-hover:translate-x-0.5 group-hover:opacity-100" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          )}
        </span>
        <span className="text-right text-[14px] text-muted text-balance">{project.line}</span>
      </figcaption>
    </figure>
  );
  return href ? (
    <Link
      href={href}
      className="group block transition-transform duration-150 ease-out active:scale-[0.985]"
      aria-label={`${project.name}: read the story`}
    >
      {figure}
    </Link>
  ) : (
    figure
  );
}

export function GradientCard({
  project,
  sizes,
  href,
  morphName,
}: {
  project: Project;
  sizes?: string;
  href?: string;
  morphName?: string;
}) {
  const { a, b, base } = project.palette;
  return (
    <Stage
      project={project}
      sizes={sizes}
      href={href}
      morphName={morphName}
      style={{
        background: `radial-gradient(110% 90% at 0% 0%, ${a} 0%, transparent 60%), radial-gradient(90% 80% at 100% 100%, ${b} 0%, transparent 65%), ${base}`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-100 mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />
    </Stage>
  );
}

export function BlurCard({ project }: { project: Project }) {
  return (
    <Stage project={project}>
      <Image
        src={project.shot}
        alt=""
        fill
        sizes="400px"
        className="scale-150 object-cover blur-2xl saturate-150"
      />
      <div aria-hidden className="absolute inset-0 bg-black/10" />
    </Stage>
  );
}

export function DotCard({ project }: { project: Project }) {
  return (
    <Stage
      project={project}
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--foreground) 4%, var(--background))",
        backgroundImage:
          "radial-gradient(color-mix(in srgb, var(--foreground) 22%, transparent) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    />
  );
}

export function SpotlightCard({ project }: { project: Project }) {
  return (
    <Stage
      project={project}
      style={{
        background: `radial-gradient(70% 60% at 55% 35%, ${project.palette.a}59 0%, transparent 70%), #141312`,
      }}
    />
  );
}
