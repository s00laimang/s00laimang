import type { Metadata } from "next";
import { SERVICE_COUNT, ServiceCards } from "../../services";

// frames of the colourful service cards, captured as share images:
// no query shows all six (16:9), ?card=1..6 shows one card on its own (16:9),
// and adding &square=1 gives a 1:1 card that survives multi-image crops
export const metadata: Metadata = {
  title: "Services shot — s00laimang",
  robots: { index: false, follow: false },
};

export default async function ServicesShot({
  searchParams,
}: {
  searchParams: Promise<{ card?: string; square?: string }>;
}) {
  const { card, square } = await searchParams;
  const isSquare = square === "1";
  const index = Number(card) - 1;
  const single = Number.isInteger(index) && index >= 0 && index < SERVICE_COUNT;

  return (
    <main className="relative flex min-h-screen flex-1 items-center justify-center px-16 py-14">
      {/* keep the dev-mode Next.js badge out of the capture */}
      <style>{"nextjs-portal{display:none}"}</style>
      {single && isSquare ? (
        <div className="w-[520px]" style={{ zoom: 1.8 }}>
          <ServiceCards tone="color" columns={1} only={index} square />
        </div>
      ) : single ? (
        // laid out at a normal card width, then scaled up as a whole so the
        // graphic keeps its proportions while filling the frame
        <div className="w-[640px]" style={{ zoom: 1.6 }}>
          <ServiceCards tone="color" columns={1} only={index} />
        </div>
      ) : (
        <div className="w-full max-w-[1440px]">
          <ServiceCards tone="color" columns={3} />
        </div>
      )}
      <span className="absolute bottom-6 right-16 font-serif text-lg tracking-tight text-muted">
        s00laimang
      </span>
    </main>
  );
}
