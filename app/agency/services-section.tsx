import { ServiceCards } from "../services";

export function Services() {
  return (
    <section id="services" className="mx-auto w-full max-w-5xl px-6 pb-24">
      <h2 className="text-center font-serif text-4xl tracking-tight">
        What can I do for you?
      </h2>
      <div className="mt-10">
        <ServiceCards tone="ink" ctas={false} />
      </div>
    </section>
  );
}
