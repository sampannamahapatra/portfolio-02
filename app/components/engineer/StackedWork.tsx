"use client";

import { useContext, useRef, useState } from "react";
import { motion, useInView, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, Trophy } from "lucide-react";
import { Preview, hostOf, type Project } from "./ProjectCard";
import { ScrollContainerContext } from "./ScrollLight";
import { mono, sora } from "./styles";

type Chapter = { label: string; projects: Project[] };
type Entry = { project: Project; chapter: string };

const slug = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function DeployLine({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const command = `$ deploy ${slug(project.title)} --prod`;
  const result = project.live ? `✓ live · ${hostOf(project.live)}` : "✓ shipped";

  return (
    <div ref={ref} className={`${mono} rounded-xl border border-white/[0.06] bg-black/40 px-4 py-3 text-[12px] leading-relaxed`}>
      <motion.span
        className="block overflow-hidden whitespace-nowrap text-slate-300"
        initial={{ width: 0 }}
        animate={inView ? { width: `${command.length}ch` } : {}}
        transition={{ duration: command.length * 0.035, ease: "linear" }}
      >
        {command}
      </motion.span>
      <motion.span
        className="block text-emerald-400"
        initial={{ opacity: 0, y: 4 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: command.length * 0.035 + 0.25, duration: 0.4 }}
      >
        {result}
      </motion.span>
    </div>
  );
}

function CaseFile({
  entry,
  index,
  total,
  progress,
}: {
  entry: Entry;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const { project } = entry;
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index) * 0.035]);
  const dim = useTransform(progress, [start, Math.min(1, start + 1 / total)], [1, index === total - 1 ? 1 : 0.55]);

  return (
    <div className="@5xl:sticky @5xl:h-[80vh]" style={{ top: `calc(7rem + ${index * 14}px)` }}>
      <motion.article
        data-cursor="view"
        style={{ scale, opacity: dim, transformOrigin: "top center" }}
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="group relative grid gap-8 overflow-hidden rounded-3xl border border-white/[0.08] bg-[linear-gradient(160deg,rgba(26,30,46,0.97),rgba(12,14,22,0.98))] p-5 shadow-[0_-20px_60px_rgba(0,0,0,0.45)] @3xl:p-7 @5xl:grid-cols-[1.15fr_1fr] @5xl:items-center"
      >
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#4A94BA]/10 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />

        <div className="relative [&_img]:duration-[6s] [&_img]:group-hover:scale-[1.08]">
          <Preview project={project} />
        </div>

        <div className="relative flex flex-col">
          <div className="flex items-baseline justify-between gap-4">
            <span className={`${sora} text-5xl font-bold tracking-[-0.05em] text-white/90 @3xl:text-6xl`}>
              {String(index + 1).padStart(2, "0")}
              <span className="text-lg font-medium text-slate-600"> / {String(total).padStart(2, "0")}</span>
            </span>
            <span className={`${mono} text-right text-[9px] uppercase tracking-[0.25em] text-slate-500`}>{entry.chapter}</span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className={`${mono} rounded-full bg-[#4A94BA]/15 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-[#7cc4e4]`}>
              {project.role}
            </span>
            <span className={`${mono} text-[9px] uppercase tracking-[0.2em] text-slate-500`}>{project.kind}</span>
          </div>

          <h3 className={`${sora} mt-3 text-[clamp(1.6rem,3.2cqw,2.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white`}>
            {project.title}
          </h3>

          {project.award && (
            <p className="mt-3 flex items-start gap-2 rounded-lg border border-amber-400/20 bg-amber-400/[0.06] px-3 py-2 text-xs text-amber-200">
              <Trophy size={14} className="mt-px shrink-0 text-amber-300" />
              {project.award}
            </p>
          )}

          <p className="mt-3 text-sm leading-relaxed text-slate-400">{project.body}</p>

          <ul className="mt-4 space-y-1.5 text-[13px] leading-snug text-slate-300">
            {project.highlights.map((h, i) => (
              <motion.li
                key={h}
                className="flex gap-2.5"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
              >
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#4A94BA]" />
                {h}
              </motion.li>
            ))}
          </ul>

          <div className="mt-5">
            <DeployLine project={project} />
          </div>

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className={`${sora} group/link mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#4A94BA] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-white shadow-[0_0_24px_rgba(74,148,186,0.35)] transition hover:bg-[#5aa5cb]`}
            >
              Visit site
              <ArrowUpRight size={13} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          )}
        </div>
      </motion.article>
    </div>
  );
}

export default function StackedWork({ chapters }: { chapters: Chapter[] }) {
  const container = useContext(ScrollContainerContext);
  const stackRef = useRef<HTMLDivElement>(null);
  const entries: Entry[] = chapters.flatMap((c) => c.projects.map((project) => ({ project, chapter: c.label })));
  const total = entries.length;
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    container: container ?? undefined,
    target: stackRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(total - 1, Math.max(0, Math.floor(v * total)))));

  return (
    <div className="relative">
      <div className="pointer-events-none sticky top-[7rem] z-20 mb-6 hidden h-0 @5xl:block">
        <div className="absolute -left-10 top-0 flex flex-col items-center gap-2">
          {entries.map((e, i) => (
            <span
              key={e.project.title}
              className={`${mono} flex h-6 w-6 items-center justify-center rounded-full text-[9px] transition-all duration-300 ${
                i === active ? "scale-110 bg-[#4A94BA] text-white shadow-[0_0_14px_rgba(124,196,228,0.7)]" : i < active ? "bg-white/15 text-slate-300" : "bg-white/[0.04] text-slate-600"
              }`}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>

      <div className={`${mono} sticky top-[4.75rem] z-20 mb-4 hidden text-[11px] uppercase tracking-[0.3em] text-slate-500 @5xl:block`}>
        <span className="text-[#7cc4e4]">{entries[active]?.chapter}</span>
        <span className="text-slate-700"> · {String(active + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}</span>
      </div>

      <div ref={stackRef} className="space-y-8 @5xl:space-y-0">
        {entries.map((e, i) => (
          <CaseFile key={e.project.title} entry={e} index={i} total={total} progress={scrollYProgress} />
        ))}
      </div>
    </div>
  );
}
