"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const playfair = "font-[family-name:var(--font-playfair)]";
const mono = "font-[family-name:var(--font-jetbrains)]";

const BARS = 14;
const STRINGS = [0, 1, 2, 3];
const NOTES = [
  { glyph: "♪", left: "18%", delay: 0, duration: 9 },
  { glyph: "♫", left: "72%", delay: 2.5, duration: 11 },
  { glyph: "♩", left: "40%", delay: 5, duration: 10 },
  { glyph: "♬", left: "84%", delay: 7, duration: 12 },
];

function stringPath(x: number, amp: number) {
  return `M${x} 0 Q${x + amp} 160 ${x} 320 T${x} 640`;
}

export default function ArtistAmbient() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-40 overflow-hidden bg-[#0a0a0a]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="bg-noise absolute inset-0 opacity-20 mix-blend-overlay" />

      <svg viewBox="0 0 300 640" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {STRINGS.map((i) => {
          const x = 105 + i * 30;
          return (
            <motion.path
              key={i}
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth={1.6 - i * 0.25}
              animate={{ d: [stringPath(x, 0), stringPath(x, 5 - i), stringPath(x, -(5 - i)), stringPath(x, 0)] }}
              transition={{ duration: 0.9 + i * 0.25, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.6 }}
            />
          );
        })}
      </svg>

      <div className="absolute left-1/2 top-[30%] h-44 w-44 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="absolute -inset-6 rounded-full bg-white/[0.06] blur-2xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-stone-800 bg-[#0a0a0a] shadow-[0_0_40px_rgba(0,0,0,0.8)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          {[10, 18, 26, 34].map((m) => (
            <span key={m} className="absolute rounded-full border border-white/[0.05]" style={{ inset: `${m}%` }} />
          ))}
          <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.06)_40deg,transparent_80deg)]" />
          <span className="absolute inset-[36%] flex items-center justify-center rounded-full bg-gradient-to-br from-stone-200 to-stone-500">
            <span className="h-2 w-2 rounded-full bg-[#0a0a0a]" />
          </span>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 top-[50%] flex h-20 items-end justify-center gap-[5px]">
        {Array.from({ length: BARS }, (_, i) => (
          <motion.span
            key={i}
            className="w-[5px] rounded-full bg-gradient-to-t from-white/20 to-white/80"
            animate={{ height: ["18%", `${40 + ((i * 37) % 60)}%`, "25%", `${30 + ((i * 53) % 70)}%`, "18%"] }}
            transition={{ duration: 1.4 + (i % 4) * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
          />
        ))}
      </div>

      {NOTES.map((n) => (
        <motion.span
          key={n.glyph}
          className="absolute bottom-0 text-xl text-white/40"
          style={{ left: n.left }}
          animate={{ y: [0, -620], opacity: [0, 0.8, 0], rotate: [0, 15, -10] }}
          transition={{ duration: n.duration, repeat: Infinity, delay: n.delay, ease: "linear" }}
        >
          {n.glyph}
        </motion.span>
      ))}

      <div className="absolute inset-x-0 top-[66%] flex flex-col items-center gap-2 text-center">
        <span className={`${playfair} text-3xl italic text-stone-100`}>The Artist</span>
        <span className={`${mono} text-[9px] uppercase tracking-[0.35em] text-stone-500`}>Bassist · Musician</span>
      </div>

      <motion.div
        className={`${mono} absolute inset-x-0 bottom-10 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.35em] text-stone-400`}
        animate={{ x: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Artist <ArrowRight size={12} />
      </motion.div>
    </motion.div>
  );
}
