"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { mono, sora } from "./styles";

const STREAM = [
  "> boot engineer.core",
  "python · fastapi",
  "next.js · typescript",
  "prisma · postgres",
  "docker · linux",
  "pandas · opencv",
  "✓ tests passing",
  "✓ deploy verified",
  "> scale --no-debt",
  "react · tailwind",
  "supabase · express",
  "✓ lighthouse 95+",
];

const TRACES = [
  "M10 40 H60 V120 H120",
  "M290 70 H230 V160 H180",
  "M20 520 H80 V430 H140",
  "M280 560 H210 V470 H160",
  "M150 0 V90",
  "M150 640 V540",
];

function Uptime() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return (
    <span>
      {mm}:{ss}
    </span>
  );
}

export default function EngineerAmbient() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-40 overflow-hidden bg-[#0B0D15]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(74,148,186,0.14),transparent_65%)]" />

      <svg viewBox="0 0 300 640" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        {TRACES.map((d, i) => (
          <g key={d}>
            <path d={d} fill="none" stroke="rgba(74,148,186,0.18)" strokeWidth="1" />
            <path
              d={d}
              fill="none"
              stroke="#7cc4e4"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="trace-pulse"
              style={{ animationDelay: `${i * 0.7}s` }}
            />
          </g>
        ))}
        {[
          [120, 120],
          [180, 160],
          [140, 430],
          [160, 470],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.5" fill="#4A94BA" />
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="absolute inset-0 rounded-full border border-dashed border-[#4A94BA]/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border border-[#4A94BA]/25 border-t-[#7cc4e4]"
          animate={{ rotate: -360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-9 rounded-full bg-[#4A94BA]/20 blur-md"
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className={`${mono} absolute inset-0 flex flex-col items-center justify-center text-center`}>
          <span className="text-[9px] uppercase tracking-[0.3em] text-slate-500">core</span>
          <span className={`${sora} text-lg font-bold text-white`}>
            &lt;/&gt;
          </span>
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 h-[38%] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]">
        <motion.ul
          className={`${mono} flex flex-col items-center gap-3 pt-6 text-[10px] tracking-[0.15em] text-[#7cc4e4]/60`}
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          {[...STREAM, ...STREAM].map((line, i) => (
            <li key={i} className={line.startsWith("✓") ? "text-emerald-400/70" : line.startsWith(">") ? "text-white/70" : ""}>
              {line}
            </li>
          ))}
        </motion.ul>
      </div>

      <div className={`${mono} absolute inset-x-0 bottom-28 flex flex-col items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-slate-500`}>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          systems nominal
        </span>
        <span className="text-slate-600">
          uptime <Uptime />
        </span>
      </div>

      <motion.div
        className={`${mono} absolute inset-x-0 bottom-10 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.35em] text-slate-400`}
        animate={{ x: [0, -6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowLeft size={12} /> Engineer
      </motion.div>
    </motion.div>
  );
}
