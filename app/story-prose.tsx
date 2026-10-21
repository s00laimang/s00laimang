"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export type Seg =
  | string
  | { icon: string; alt: string; dark?: string; invert?: boolean };

const DIM = 0.14; // opacity of a word that hasn't been reached yet

type Piece =
  | { kind: "text"; text: string; space: boolean }
  | { kind: "icon"; seg: Exclude<Seg, string>; space: boolean };

const isPunct = (w: string) => /^[.,;:!?)’”]+$/.test(w);

// words and inline icons as separate pieces, so each one can light up alone
function toPieces(segs: Seg[]): Piece[] {
  const pieces: Piece[] = [];
  for (const seg of segs) {
    if (typeof seg === "string") {
      const lead = /^\s/.test(seg);
      seg
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .forEach((w, i) => {
          const first = pieces.length === 0;
          const space = !first && !isPunct(w) && (i > 0 || lead);
          pieces.push({ kind: "text", text: w, space });
        });
    } else {
      pieces.push({ kind: "icon", seg, space: pieces.length > 0 });
    }
  }
  return pieces;
}

export function InlineIcon({ seg }: { seg: Exclude<Seg, string> }) {
  const cls = "inline-block size-[1.05em] rounded-[0.22em] object-contain align-middle -translate-y-[0.08em]";
  if (seg.dark) {
    return (
      <>
        <Image src={seg.icon} alt={seg.alt} width={64} height={64} unoptimized className={`${cls} dark:hidden`} />
        <Image src={seg.dark} alt={seg.alt} width={64} height={64} unoptimized className={`${cls} hidden dark:inline-block`} />
      </>
    );
  }
  return (
    <Image
      src={seg.icon}
      alt={seg.alt}
      width={64}
      height={64}
      unoptimized
      className={`${cls} ${seg.invert ? "dark:invert" : ""}`}
    />
  );
}

// a paragraph whose words light up one by one as it scrolls from the lower
// part of the screen up past the middle, the way the Payfrica intro reads
export function LitParagraph({ segs, className = "" }: { segs: Seg[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const pieceRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pieces = toPieces(segs);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = pieceRefs.current;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => s && (s.style.opacity = "1"));
      return;
    }

    // runs straight from the scroll event rather than waiting for an animation
    // frame: phones throttle or pause frames during touch scrolling and in
    // low-power mode, which left the words stuck dim. a paragraph is only a few
    // dozen spans, so updating them per scroll event is cheap
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // starts lighting as the top enters the lower screen, and is fully lit
      // once its last line has risen to 60% of the screen height
      const start = vh * 0.9;
      const end = vh * 0.6 - rect.height;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      const lit = progress * spans.length;
      spans.forEach((s, i) => {
        if (!s) return;
        const local = Math.min(1, Math.max(0, lit - i));
        s.style.opacity = String(DIM + (1 - DIM) * local);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // iOS keeps firing these while the URL bar shrinks and grows mid-scroll
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {pieces.map((piece, i) => (
        <span
          key={i}
          ref={(node) => {
            pieceRefs.current[i] = node;
          }}
          style={{ opacity: DIM }}
          className="transition-opacity duration-150"
        >
          {piece.space ? " " : ""}
          {piece.kind === "text" ? piece.text : <InlineIcon seg={piece.seg} />}
        </span>
      ))}
    </p>
  );
}

// the same inline icons without the scroll effect, for headlines
export function StaticLine({ segs }: { segs: Seg[] }) {
  return (
    <>
      {toPieces(segs).map((piece, i) => (
        <span key={i}>
          {piece.space ? " " : ""}
          {piece.kind === "text" ? piece.text : <InlineIcon seg={piece.seg} />}
        </span>
      ))}
    </>
  );
}
