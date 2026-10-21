import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PriceField } from "../../../pricing";
import { GRAIN, GradientCard, PROJECTS } from "../../../showcase";
import { LitParagraph, StaticLine } from "../../../story-prose";
import { STORIES } from "../../../stories";
import { AgencyFooter } from "../../footer";
import { AgencyNav } from "../../hero";

const SLUGS = Object.keys(PROJECTS);

export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS[slug];
  return project
    ? { title: `${project.name} — s00laimang`, description: project.line }
    : {};
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={`size-3.5 fill-none stroke-current stroke-[1.6] ${className}`} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

// the story's numbers, each sitting in a hole cut out of the "+" field, the
// same way prices sit on the pricing cards
function Stats({ items, seed }: { items: { value: string; label: string }[]; seed: number }) {
  const single = items.length === 1;
  return (
    <div className={`grid gap-3 ${single ? "" : "sm:grid-cols-3"}`}>
      {items.map((stat, i) => (
        <div
          key={stat.label}
          className="price-card relative overflow-hidden rounded-md px-5 py-6 ring-1 ring-foreground/[0.06] sm:px-8"
          style={{ backgroundColor: "color-mix(in srgb, #7d766c 16%, var(--background))" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-90 mix-blend-overlay"
            style={{ backgroundImage: GRAIN }}
          />
          <div className="relative">
            {single ? (
              <PriceField cols={28} rows={7} cut={[7, 20, 1, 5]} seed={seed}>
                <span className="font-serif text-5xl leading-none tracking-tight sm:text-7xl">{stat.value}</span>
                <span className="mt-2 text-[13px] text-muted sm:text-[14px]">{stat.label}</span>
              </PriceField>
            ) : (
              <PriceField cols={13} rows={8} cut={[2, 10, 2, 5]} seed={seed + i}>
                <span className="font-serif text-4xl leading-none tracking-tight sm:text-5xl">{stat.value}</span>
                <span className="mt-2 text-[12px] text-muted sm:text-[13px]">{stat.label}</span>
              </PriceField>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function ProjectStory({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS[slug];
  const story = STORIES[slug];
  if (!project || !story) notFound();

  const index = SLUGS.indexOf(slug);
  const nextSlug = SLUGS[(index + 1) % SLUGS.length];
  const next = PROJECTS[nextSlug];
  const href = `https://${project.url}`;

  return (
    <main className="flex flex-1 flex-col">
      <AgencyNav active="Work" />

      <article className="mx-auto w-full max-w-5xl px-6 pb-24 pt-14 sm:pt-20">
        <Link
          href="/agency/projects"
          className="inline-flex items-center gap-1.5 text-[14px] text-muted transition-colors hover:text-foreground"
        >
          <Arrow className="rotate-180" />
          All work
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-2 text-[13px] text-muted">
          {[story.kind, story.role, story.year].filter(Boolean).map((item) => (
            <span
              key={item}
              className="rounded-md bg-background px-2.5 py-1 shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-foreground/[0.06]"
            >
              {item}
            </span>
          ))}
        </div>

        <h1 className="mt-6 max-w-4xl font-serif text-[40px] leading-[1.1] tracking-tight text-balance sm:text-6xl sm:leading-[1.06]">
          <StaticLine segs={story.headline} />
        </h1>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex items-center gap-2 border-b border-foreground/60 pb-0.5 text-[15px] font-medium transition-colors hover:border-foreground"
        >
          Visit {project.url}
          <Arrow className="-rotate-45 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        <div className="mt-12">
          <GradientCard
            project={project}
            sizes="(min-width: 1024px) 1000px, 95vw"
            morphName={`project-${slug}`}
          />
        </div>

        {/* one continuous story: each paragraph lights up word by word as it
            scrolls past, with quotes and numbers dropped in where they happen */}
        <div className="mx-auto mt-20 max-w-3xl space-y-12 sm:space-y-16">
          {story.blocks.map((block, i) => {
            if ("p" in block)
              return (
                <LitParagraph
                  key={i}
                  segs={block.p}
                  className="font-serif text-[26px] leading-[1.42] tracking-tight sm:text-[34px] sm:leading-[1.38]"
                />
              );
            if ("quote" in block)
              return (
                <figure key={i} className="border-l-2 border-foreground/15 pl-6">
                  <blockquote className="text-[19px] leading-[1.6] text-muted sm:text-[21px]">
                    &ldquo;{block.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-2 text-[12px] uppercase tracking-[0.14em] text-muted/80">
                    {block.by}
                  </figcaption>
                </figure>
              );
            return <Stats key={i} items={block.stats} seed={index + 3} />;
          })}
        </div>

        <Link
          href={`/agency/projects/${nextSlug}`}
          className="group mt-20 flex items-center justify-between gap-6 rounded-md p-6 ring-1 ring-foreground/[0.06] transition-colors sm:p-8"
          style={{
            background: `radial-gradient(90% 140% at 0% 0%, ${next.palette.a}55, transparent 60%), color-mix(in srgb, #7d766c 12%, var(--background))`,
          }}
        >
          <div>
            <p className="text-[12px] uppercase tracking-[0.14em] text-muted">Next project</p>
            <p className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">{next.name}</p>
            <p className="mt-1 text-[15px] text-muted">{next.line}</p>
          </div>
          <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-foreground text-background transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 motion-reduce:transition-none">
            <Arrow className="size-4" />
          </span>
        </Link>
      </article>

      <AgencyFooter />
    </main>
  );
}
