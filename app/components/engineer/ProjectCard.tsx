"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Trophy, type LucideIcon } from "lucide-react";
import type { MouseEvent } from "react";
import { card, mono, sora } from "./styles";

export type Project = {
  title: string;
  kind: string;
  role: string;
  body: string;
  highlights: string[];
  icon: LucideIcon;
  live?: string;
  repo?: string;
  image?: string;
  award?: string;
};

const MAX_TILT = 6;

const linkButton = `${sora} group/link inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-slate-200 transition-colors hover:border-[#4A94BA] hover:bg-[#4A94BA] hover:text-white`;

function hostOf(url: string) {
  return new URL(url).host.replace(/^www\./, "");
}

function Preview({ project }: { project: Project }) {
  const Icon = project.icon;

  if (project.image) {
    return (
      <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b0d14]">
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
          {project.live && (
            <span className={`${mono} ml-2 truncate rounded bg-white/[0.04] px-2 py-0.5 text-[9px] text-slate-500`}>
              {hostOf(project.live)}
            </span>
          )}
        </div>
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} homepage`}
            fill
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="object-cover object-top transition-transform duration-[1.6s] ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d14]/60 via-transparent to-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-[radial-gradient(ellipse_at_center,rgba(74,148,186,0.18),transparent_70%)]">
      {[0, 1, 2].map((ring) => (
        <motion.span
          key={ring}
          className="absolute rounded-full border border-[#4A94BA]/25"
          style={{ width: 70 + ring * 55, height: 70 + ring * 55 }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.15, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, delay: ring * 0.6, ease: "easeInOut" }}
        />
      ))}
      <div className="relative rounded-2xl border border-white/10 bg-[#0F111A]/80 p-4 text-[#7cc4e4] shadow-[0_0_40px_rgba(74,148,186,0.25)] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3">
        <Icon size={30} strokeWidth={1.5} />
      </div>
    </div>
  );
}

export default function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [MAX_TILT, -MAX_TILT]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-MAX_TILT, MAX_TILT]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(px, (v) => `${v * 100}%`);
  const glowY = useTransform(py, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${glowX} ${glowY}, rgba(74,148,186,0.16), transparent 65%)`;

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`${card} group relative flex h-full flex-col overflow-hidden p-4 transition-colors duration-500 hover:border-[#4A94BA]/35`}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: spotlight }} />

      <Preview project={project} />

      <div className="relative flex flex-1 flex-col px-3 pb-3 pt-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`${mono} rounded-full bg-[#4A94BA]/15 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-[#7cc4e4]`}>
            {project.role}
          </span>
          <span className={`${mono} text-[9px] uppercase tracking-[0.2em] text-slate-500`}>{project.kind}</span>
          {project.live && (
            <span className={`${mono} ml-auto flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-emerald-400`}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Live
            </span>
          )}
        </div>

        <h3 className={`${sora} mt-4 font-bold tracking-[-0.02em] text-white ${featured ? "text-2xl" : "text-xl"}`}>{project.title}</h3>

        {project.award && (
          <p className="mt-3 flex items-start gap-2 rounded-lg border border-amber-400/20 bg-amber-400/[0.06] px-3 py-2 text-xs text-amber-200">
            <Trophy size={14} className="mt-px shrink-0 text-amber-300" />
            {project.award}
          </p>
        )}

        <p className="mt-3 text-sm leading-relaxed text-slate-400">{project.body}</p>

        <ul className="mt-4 space-y-2 text-[13px] leading-snug text-slate-300">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2.5">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#4A94BA]" />
              {h}
            </li>
          ))}
        </ul>

        {(project.live || project.repo) && (
          <>
            <div className="mt-auto pt-6" />
            <div className="flex flex-wrap gap-2">
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className={linkButton}>
                  Visit site
                  <ArrowUpRight size={13} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </a>
              )}
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className={linkButton}>
                  <Github size={13} />
                  View code
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </motion.article>
  );
}
