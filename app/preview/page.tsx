import type { Metadata } from "next";
import Link from "next/link";
import {
  BlurCard,
  DotCard,
  GradientCard,
  PROJECTS,
  SpotlightCard,
  type Project,
} from "../showcase";
import { AgencyFooter } from "../agency/footer";
import { Faq } from "../faq";
import { PricingCards } from "../pricing";
import { ServiceCards } from "../services";

// sandbox for trying /agency directions side by side; not linked anywhere
export const metadata: Metadata = {
  title: "Preview — s00laimang",
  robots: { index: false, follow: false },
};

const SAMPLE = [PROJECTS.kintasme, PROJECTS.askoga];

const DIRECTIONS: {
  key: string;
  title: string;
  note: string;
  Card: (props: { project: Project }) => React.ReactNode;
}[] = [
  {
    key: "A",
    title: "Brand gradient + grain",
    note: "Each project gets a soft gradient in its own colors, with film grain on top.",
    Card: GradientCard,
  },
  {
    key: "B",
    title: "Blurred screenshot",
    note: "The backdrop is the screenshot itself, blown up and blurred. Always matches.",
    Card: BlurCard,
  },
  {
    key: "C",
    title: "Cream dot grid",
    note: "Quiet and on-brand with the rest of the site. Lets the screenshot do the talking.",
    Card: DotCard,
  },
  {
    key: "D",
    title: "Dark spotlight",
    note: "Charcoal stage with a glow in the project's color behind the window.",
    Card: SpotlightCard,
  },
];

export default function Preview() {
  return (
    <main className="mx-auto w-full max-w-[1520px] flex-1 px-6 py-16">
      <header>
        <Link href="/agency" className="text-[14px] text-muted transition-colors hover:text-foreground">
          ← /agency
        </Link>
        <h1 className="mt-3 font-serif text-4xl tracking-tight">/preview</h1>
        <p className="mt-2 text-[15px] text-muted">
          Showcase directions for the project screenshots. Pick one and it
          moves to /agency. The original four directions are further down.
        </p>
      </header>

      <section className="mt-16">
        <div className="flex items-baseline gap-3">
          <span className="flex h-7 shrink-0 items-center justify-center rounded-md bg-foreground px-2 font-mono text-[13px] text-background">
            Ft
          </span>
          <h2 className="font-serif text-2xl tracking-tight">Footer, closing card</h2>
        </div>
        <p className="mt-1.5 text-[15px] text-muted">
          A last call to action that echoes the hero, the useful links, and a
          giant wordmark cropped by the card. Hover the card to lift it.
        </p>
        <div className="mt-6">
          <AgencyFooter />
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline gap-3">
          <span className="flex h-7 shrink-0 items-center justify-center rounded-md bg-foreground px-2 font-mono text-[13px] text-background">
            F
          </span>
          <h2 className="font-serif text-2xl tracking-tight">FAQ, two columns</h2>
        </div>
        <p className="mt-1.5 text-[15px] text-muted">
          Heading and a call button stay put on the left while the questions
          scroll on the right. The &ldquo;+&rdquo; turns into an &ldquo;×&rdquo; when a question opens.
        </p>
        <div className="mx-auto mt-10 max-w-5xl">
          <Faq />
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline gap-3">
          <span className="flex h-7 shrink-0 items-center justify-center rounded-md bg-foreground px-2 font-mono text-[13px] text-background">
            P
          </span>
          <h2 className="font-serif text-2xl tracking-tight">Pricing, plus field</h2>
        </div>
        <p className="mt-1.5 text-[15px] text-muted">
          Prices sit in a hole cut out of a field of &ldquo;+&rdquo; marks. Hover a card to
          sweep the shades. The prices here are placeholders.
        </p>
        <div className="mx-auto mt-6 max-w-5xl">
          <PricingCards />
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline gap-3">
          <span className="flex h-7 shrink-0 items-center justify-center rounded-md bg-foreground px-2 font-mono text-[13px] text-background">
            S1
          </span>
          <h2 className="font-serif text-2xl tracking-tight">Services, one colour per card</h2>
        </div>
        <p className="mt-1.5 text-[15px] text-muted">
          The current version: each service gets its own hue.
        </p>
        <div className="mx-auto mt-6 max-w-5xl">
          <ServiceCards tone="color" />
        </div>
      </section>
      <section className="mt-16">
        <div className="flex items-baseline gap-3">
          <span className="flex h-7 shrink-0 items-center justify-center rounded-md bg-foreground px-2 font-mono text-[13px] text-background">
            S2
          </span>
          <h2 className="font-serif text-2xl tracking-tight">Services, warm ink</h2>
        </div>
        <p className="mt-1.5 text-[15px] text-muted">
          One shared palette: deeper cream cards, every graphic in warm charcoal. Lets the project marquee carry the colour.
        </p>
        <div className="mx-auto mt-6 max-w-5xl">
          <ServiceCards tone="ink" />
        </div>
      </section>
      <section className="mt-16">
        <div className="flex items-baseline gap-3">
          <span className="flex h-7 shrink-0 items-center justify-center rounded-md bg-foreground px-2 font-mono text-[13px] text-background">
            S3
          </span>
          <h2 className="font-serif text-2xl tracking-tight">Services, one accent</h2>
        </div>
        <p className="mt-1.5 text-[15px] text-muted">
          Same calm cards, every graphic in a single sky blue, echoing the homepage&apos;s verified badge.
        </p>
        <div className="mx-auto mt-6 max-w-5xl">
          <ServiceCards tone="sky" />
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline gap-3">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-foreground font-mono text-[13px] text-background">
            A
          </span>
          <h2 className="font-serif text-2xl tracking-tight">
            Brand gradient + grain, full set
          </h2>
        </div>
        <p className="mt-1.5 text-[15px] text-muted">
          The pick so far, with every project and your screenshots.
        </p>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {Object.values(PROJECTS).map((project) => (
            <GradientCard key={project.name} project={project} />
          ))}
        </div>
      </section>

      {DIRECTIONS.map(({ key, title, note, Card }) => (
        <section key={key} className="mt-16">
          <div className="flex items-baseline gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-foreground font-mono text-[13px] text-background">
              {key}
            </span>
            <h2 className="font-serif text-2xl tracking-tight">{title}</h2>
          </div>
          <p className="mt-1.5 text-[15px] text-muted">{note}</p>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            {SAMPLE.map((project) => (
              <Card key={project.name} project={project} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
