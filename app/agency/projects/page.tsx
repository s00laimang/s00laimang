import type { Metadata } from "next";
import { GradientCard, PROJECTS } from "../../showcase";
import { AgencyNav } from "../hero";

export const metadata: Metadata = {
  title: "Projects — s00laimang",
};

export default function Projects() {
  return (
    <main className="flex flex-1 flex-col">
      <AgencyNav active="Work" />
      <section className="mx-auto w-full max-w-[1520px] px-6 pb-24 pt-20">
        <h1 className="text-center font-serif text-4xl tracking-tight">
          All projects
        </h1>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {Object.entries(PROJECTS).map(([slug, project]) => (
            <GradientCard
              key={project.name}
              project={project}
              href={`/agency/projects/${slug}`}
              morphName={`project-${slug}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
