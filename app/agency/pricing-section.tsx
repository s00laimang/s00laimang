import { PricingCards } from "../pricing";

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto w-full max-w-5xl px-6 pb-24">
      <h2 className="text-center font-serif text-4xl tracking-tight">
        Honest prices, no surprises
      </h2>
      <div className="mt-10">
        <PricingCards />
      </div>
    </section>
  );
}
