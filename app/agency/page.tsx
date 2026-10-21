import type { Metadata } from "next";
import { FaqSection } from "./faq-section";
import { AgencyFooter } from "./footer";
import { AgencyNav, Hero } from "./hero";
import { Pricing } from "./pricing-section";
import { Services } from "./services-section";
import { Work } from "./work";

export const metadata: Metadata = {
  title: "Agency — s00laimang",
};

export default function Agency() {
  return (
    <main className="flex flex-1 flex-col">
      <AgencyNav />
      <Hero />
      <Work />
      <Services />
      <Pricing />
      <FaqSection />
      <AgencyFooter />
    </main>
  );
}
