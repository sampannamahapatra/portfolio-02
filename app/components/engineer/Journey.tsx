"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, GraduationCap, HeartHandshake, MapPin, School, Users, X, type LucideIcon } from "lucide-react";
import { ScrollContainerContext } from "./ScrollLight";
import { card, gradientText, mono, sora } from "./styles";

type Place = { name: string; query: string; area: string };

type Milestone = {
  year: string;
  period: string;
  kind: "Education" | "Leadership" | "Volunteer";
  title: string;
  org: string;
  icon: LucideIcon;
  details: string[];
  stats?: [string, string][];
  progress?: { label: string; done: number; total: number };
  place?: Place;
};

const MILESTONES: Milestone[] = [
  {
    year: "2011",
    period: "2011-2019",
    kind: "Education",
    title: "SSC (Secondary)",
    org: "Habiganj Govt High School",
    icon: School,
    details: ["Secondary School Certificate with a perfect GPA."],
    stats: [["GPA", "5.00"]],
    place: { name: "Habiganj Govt High School", query: "Habiganj Govt High School, Habiganj, Bangladesh", area: "Habiganj, Sylhet Division" },
  },
  {
    year: "2019",
    period: "2019-2021",
    kind: "Education",
    title: "HSC (Higher Secondary)",
    org: "Jalalabad Cantonment Public School",
    icon: School,
    details: ["Higher Secondary Certificate with a perfect GPA."],
    stats: [["GPA", "5.00"]],
    place: {
      name: "Jalalabad Cantonment Public School & College",
      query: "Jalalabad Cantonment Public School and College, Sylhet, Bangladesh",
      area: "Jalalabad Cantonment, Sylhet",
    },
  },
  {
    year: "2020",
    period: "2020-Present",
    kind: "Leadership",
    title: "Founder & VP",
    org: "Muktanchal Lit. Club",
    icon: Users,
    details: ["Founded and still help lead a literature club."],
    stats: [["Leading for", `${new Date().getFullYear() - 2020}+ years`]],
  },
  {
    year: "2022",
    period: "2022-Present",
    kind: "Education",
    title: "B.Sc. in Computer Science & Engineering",
    org: "Northern University Bangladesh",
    icon: GraduationCap,
    details: ["Coursework: Machine Learning, Operating Systems, Web Programming, AI, Deep Learning, DBMS."],
    stats: [
      ["CGPA", "3.25 / 4.00"],
      ["Focus", "Data Science"],
    ],
    progress: { label: "Credits completed", done: 140, total: 152 },
    place: { name: "Northern University Bangladesh", query: "Northern University Bangladesh, Dhaka", area: "Dhaka" },
  },
  {
    year: "2023",
    period: "2023",
    kind: "Leadership",
    title: "Executive Member",
    org: "Northern University Computer Club",
    icon: Users,
    details: ["Executive committee of the university computer club."],
    place: { name: "Northern University Bangladesh", query: "Northern University Bangladesh, Dhaka", area: "Dhaka" },
  },
  {
    year: "Service",
    period: "Volunteer",
    kind: "Volunteer",
    title: "Humanitarian Work",
    org: "COVID-19 Charity · Flood Relief",
    icon: HeartHandshake,
    details: ["Organizer, COVID-19 Charity", "Flood Relief Volunteer (Sunamganj)"],
    place: { name: "Flood relief, Sunamganj", query: "Sunamganj, Bangladesh", area: "Sunamganj, Sylhet Division" },
  },
];

const KIND_STYLE: Record<Milestone["kind"], string> = {
  Education: "bg-[#4A94BA]/15 text-[#7cc4e4]",
  Leadership: "bg-violet-400/10 text-violet-300",
  Volunteer: "bg-emerald-400/10 text-emerald-300",
};

function MapModal({ place, onClose }: { place: Place; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const q = encodeURIComponent(place.query);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Map: ${place.name}`}
        className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0F111A] shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-[#4A94BA]/15 p-2 text-[#7cc4e4]">
              <MapPin size={16} />
            </span>
            <div>
              <p className={`${sora} font-semibold text-white`}>{place.name}</p>
              <p className={`${mono} text-[10px] uppercase tracking-[0.2em] text-slate-500`}>{place.area}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close map"
            className="rounded-full border border-white/10 p-2 text-slate-400 transition-colors hover:border-white/30 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
        <div className="relative aspect-[16/10] bg-[#0b0d14]">
          <iframe
            title={`Map of ${place.name}`}
            src={`https://www.google.com/maps?q=${q}&z=14&output=embed`}
            className="absolute inset-0 h-full w-full border-0 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.6)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="flex justify-end px-5 py-4">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${q}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${sora} inline-flex items-center gap-1.5 rounded-full bg-[#4A94BA] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-white transition hover:bg-[#5aa5cb]`}
          >
            Open in Maps <ArrowUpRight size={13} />
          </a>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

function MilestoneCard({ m, side, onOpen }: { m: Milestone; side: "left" | "right"; onOpen: (p: Place) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const Icon = m.icon;
  const clickable = Boolean(m.place);

  return (
    <div ref={ref} className={`relative flex pl-12 @4xl:pl-0 ${side === "left" ? "@4xl:justify-start" : "@4xl:justify-end"}`}>
      <span className="absolute left-[18px] top-8 -translate-x-1/2 @4xl:left-1/2">
        <motion.span
          className="block h-4 w-4 rounded-full border-2 border-[#0F111A]"
          animate={{
            backgroundColor: inView ? "#7cc4e4" : "#1f2433",
            boxShadow: inView ? "0 0 0 6px rgba(74,148,186,0.18), 0 0 24px rgba(124,196,228,0.8)" : "0 0 0 0 rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.5 }}
        />
        {inView && <span className="absolute inset-0 animate-ping rounded-full bg-[#7cc4e4]/40" />}
      </span>

      <motion.div
        initial={{ opacity: 0, x: side === "left" ? -40 : 40, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full @4xl:w-[calc(50%-3rem)]"
      >
        <motion.div
          data-cursor={clickable ? "map" : undefined}
          role={clickable ? "button" : undefined}
          tabIndex={clickable ? 0 : undefined}
          onClick={() => m.place && onOpen(m.place)}
          onKeyDown={(e) => {
            if (m.place && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              onOpen(m.place);
            }
          }}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className={`${card} group relative overflow-hidden p-7 transition-colors duration-500 hover:border-[#4A94BA]/40 ${clickable ? "cursor-pointer" : ""}`}
        >
          <span
            className={`${sora} pointer-events-none absolute -right-2 -top-6 select-none text-[6.5rem] font-bold leading-none tracking-[-0.06em] text-white/[0.035] transition-colors duration-700 group-hover:text-[#4A94BA]/10`}
          >
            {m.year}
          </span>
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-[#4A94BA]/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />

          <div className="relative flex items-start justify-between gap-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-[#7cc4e4] transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
              <Icon size={20} />
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={`${mono} rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] ${KIND_STYLE[m.kind]}`}>{m.kind}</span>
              <span className={`${mono} text-[10px] uppercase tracking-[0.25em] text-slate-500`}>{m.period}</span>
            </div>
          </div>

          <h3 className={`${sora} relative mt-6 text-xl font-bold tracking-[-0.02em] text-white @4xl:text-2xl`}>{m.title}</h3>
          <p className="relative mt-1 text-sm text-slate-400">{m.org}</p>

          {m.stats && (
            <div className="relative mt-5 flex flex-wrap gap-2">
              {m.stats.map(([k, v]) => (
                <div key={k} className="rounded-xl border border-white/[0.06] bg-black/25 px-3 py-2">
                  <p className={`${mono} text-[9px] uppercase tracking-[0.2em] text-slate-500`}>{k}</p>
                  <p className={`${mono} mt-0.5 whitespace-nowrap text-xs text-slate-100`}>{v}</p>
                </div>
              ))}
            </div>
          )}

          {m.progress && (
            <div className="relative mt-5">
              <div className={`${mono} mb-2 flex justify-between text-[10px] uppercase tracking-[0.2em] text-slate-500`}>
                <span>{m.progress.label}</span>
                <span className="text-slate-300">
                  {m.progress.done} / {m.progress.total}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#4A94BA] to-[#a5dcf3]"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(m.progress.done / m.progress.total) * 100}%` }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          )}

          <ul className="relative mt-5 space-y-1.5 text-[13px] leading-relaxed text-slate-300">
            {m.details.map((d) => (
              <li key={d} className="flex gap-2.5">
                <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-[#4A94BA]" />
                {d}
              </li>
            ))}
          </ul>

          {m.place && (
            <div className="relative mt-6 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
              <span className={`${mono} flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500`}>
                <MapPin size={12} className="text-[#7cc4e4]" />
                {m.place.area}
              </span>
              <span
                className={`${sora} inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-200 transition-colors group-hover:border-[#4A94BA] group-hover:bg-[#4A94BA] group-hover:text-white`}
              >
                View on map
              </span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Journey() {
  const container = useContext(ScrollContainerContext);
  const trackRef = useRef<HTMLDivElement>(null);
  const [openPlace, setOpenPlace] = useState<Place | null>(null);

  const { scrollYProgress } = useScroll({
    container: container ?? undefined,
    target: trackRef,
    offset: ["start 0.7", "end 0.6"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const tipTop = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <div>

      <div ref={trackRef} className="relative">
        <div className="absolute bottom-0 left-[18px] top-0 w-px -translate-x-1/2 bg-white/[0.07] @4xl:left-1/2" />
        <motion.div
          className="absolute left-[18px] top-0 w-[2px] origin-top -translate-x-1/2 bg-gradient-to-b from-[#4A94BA] via-[#7cc4e4] to-[#a5dcf3] shadow-[0_0_12px_rgba(124,196,228,0.7)] @4xl:left-1/2"
          style={{ scaleY: progress, height: "100%" }}
        />
        <motion.div className="absolute left-[18px] -translate-x-1/2 -translate-y-1/2 @4xl:left-1/2" style={{ top: tipTop }}>
          <span className="block h-3 w-3 rounded-full bg-white shadow-[0_0_20px_6px_rgba(124,196,228,0.8)]" />
        </motion.div>

        <div className="space-y-14 @4xl:space-y-6">
          {MILESTONES.map((m, i) => (
            <MilestoneCard key={`${m.title}-${m.year}`} m={m} side={i % 2 === 0 ? "left" : "right"} onOpen={setOpenPlace} />
          ))}
        </div>

        <div className="relative mt-16 flex justify-start pl-12 @4xl:justify-center @4xl:pl-0">
          <p className={`${sora} text-lg text-slate-400`}>
            And the route continues <span className={`italic ${gradientText}`}>at HaorGrix.</span>
          </p>
        </div>
      </div>

      <AnimatePresence>{openPlace && <MapModal place={openPlace} onClose={() => setOpenPlace(null)} />}</AnimatePresence>
    </div>
  );
}
