import { GradientCard, PROJECTS } from "../showcase";

const CARD_SIZES = "(min-width: 640px) 560px, 85vw";

function WorkTrack({ hidden }: { hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden}
      inert={hidden || undefined}
      className="work-half flex shrink-0 gap-4 pr-4"
    >
      {Object.entries(PROJECTS).map(([slug, project]) => (
        <div key={project.name} className="w-[min(85vw,560px)] shrink-0">
          <GradientCard
            project={project}
            sizes={CARD_SIZES}
            href={`/agency/projects/${slug}`}
            morphName={hidden ? undefined : `project-${slug}`}
          />
        </div>
      ))}
    </div>
  );
}

// two identical tracks slide left forever so the loop has no seam;
// hovering anywhere pauses it
export function Work() {
  return (
    <section id="work" aria-label="Work" className="pb-24">
      <div className="work-marquee">
        <div className="work-track flex w-max">
          <WorkTrack />
          <WorkTrack hidden />
        </div>
      </div>
    </section>
  );
}
