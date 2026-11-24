"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  Code2,
  Database,
  Github,
  GraduationCap,
  HeartHandshake,
  Layout,
  Mail,
  Terminal,
  Users,
  type LucideIcon,
} from "lucide-react";
import ParticleField from "./engineer/ParticleField";

const EMAIL = "sampannamahapatra6@gmail.com";
const GITHUB = "https://github.com/sampannamahapatra";

const NAV = [
  { label: "About", id: "engineer-about" },
  { label: "Journey", id: "engineer-education" },
  { label: "Stack", id: "engineer-skills" },
  { label: "Work", id: "engineer-projects" },
  { label: "Contact", id: "engineer-contact" },
];

const STACK: { title: string; icon: LucideIcon; items: string[] }[] = [
  { title: "Languages", icon: Code2, items: ["Python", "Java", "C++", "JavaScript", "SQL"] },
  { title: "Platforms", icon: Terminal, items: ["Linux", "Git", "Docker", "Oracle"] },
  { title: "AI / Data", icon: Database, items: ["Colab", "Roboflow", "Pandas", "Jupyter"] },
  { title: "Design", icon: Layout, items: ["Figma", "Illustrator", "Canva"] },
];

const EDUCATION = [
  { title: "HSC (Higher Secondary)", place: "Jalalabad Cant. Public School", years: "2019 — 2021", score: "GPA 5.00" },
  { title: "SSC (Secondary)", place: "Habiganj Govt High School", years: "2011 — 2019", score: "GPA 5.00" },
];

const LEADERSHIP: { role: string; org: string; years: string; icon: LucideIcon; notes?: string[] }[] = [
  { role: "Founder & VP", org: "Muktanchal Lit. Club", years: "2020 — Present", icon: Users },
  { role: "Executive Member", org: "Northern University Computer Club", years: "2023", icon: Users },
  {
    role: "Humanitarian Work",
    org: "Volunteer",
    years: "",
    icon: HeartHandshake,
    notes: ["Organizer, COVID-19 Charity", "Flood Relief Volunteer (Sunamganj)"],
  },
];

const PROJECTS = [
  {
    title: "TFT Game Concept",
    status: "Design",
    body: "Graphics design project covering visual elements, UI/UX concepts and game asset integration patterns.",
    tags: ["UI/UX", "Design"],
  },
  {
    title: "C++ Phonebook",
    status: "Console app",
    body: "Console application with full CRUD for contacts, built on file management and core data structures in C++.",
    tags: ["C++", "Algorithms"],
  },
];

const sora = "font-[family-name:var(--font-sora)]";
const mono = "font-[family-name:var(--font-jetbrains)]";
const gradientText = "text-transparent bg-clip-text bg-gradient-to-r from-[#7cc4e4] to-[#4A94BA]";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className={`${mono} inline-block border-l border-[#4A94BA]/50 pl-3 text-[11px] uppercase tracking-[0.3em] text-[#4A94BA]`}>
      {children}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  intro?: string;
}) {
  return (
    <div className="mb-12 flex flex-col gap-6 @3xl:flex-row @3xl:items-end @3xl:justify-between">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className={`${sora} mt-5 text-[clamp(2rem,5.5cqw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white`}>
          {title}
          <br />
          <span className={`italic font-light ${gradientText}`}>{accent}</span>
        </h2>
      </div>
      {intro && <p className="max-w-sm text-sm leading-relaxed text-slate-400 @3xl:text-right">{intro}</p>}
    </div>
  );
}

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className={className}>
      {children}
    </motion.div>
  );
}

const card = "rounded-2xl border border-white/[0.06] bg-[rgba(20,22,34,0.7)] backdrop-blur-sm";

export default function EngineerSide({ isActive, isShrunk }: { isActive: boolean; isShrunk?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const contentVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] } },
    shrunk: { opacity: 0.3, scale: 0.97, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden bg-[#0F111A] font-[family-name:var(--font-inter)] text-slate-200 ${isActive ? "" : "pointer-events-none"}`}
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px]" />

      {isActive && (
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          aria-label="Engineer sections"
          className="absolute left-1/2 top-5 z-[100] flex w-max max-w-[92%] -translate-x-1/2 items-center gap-5 overflow-x-auto rounded-full border border-white/[0.06] bg-[#0F111A]/80 px-5 py-2 backdrop-blur-md"
        >
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`${sora} py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400 transition-colors hover:text-white`}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="rounded-full bg-[#4A94BA] p-1.5 text-white shadow-[0_0_20px_rgba(74,148,186,0.35)] transition-transform hover:-translate-y-0.5"
          >
            <ArrowUp size={14} />
          </button>
        </motion.nav>
      )}

      <div ref={containerRef} className="h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth">
        <motion.div
          className="@container relative z-10 w-full"
          variants={contentVariants}
          initial="hidden"
          animate={isActive ? "visible" : "shrunk"}
        >
          {/* Hero */}
          <section id="engineer-hero" className="relative flex min-h-screen w-full items-center px-6 pb-16 pt-28 @3xl:px-14">
            <div className="absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]">
              <ParticleField />
            </div>

            <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 @3xl:grid-cols-[1.15fr_0.85fr]">
              <div className="flex flex-col items-center text-center @3xl:items-start @3xl:text-left">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className={`${mono} mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-slate-300`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#4A94BA] shadow-[0_0_8px_#4A94BA]" />
                  Software • AI • Data • Design
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`${sora} text-[clamp(2.5rem,8cqw,5.5rem)] font-bold leading-[1] tracking-[-0.04em] text-white`}
                >
                  Sampanna
                  <br />
                  <span className={`italic font-light ${gradientText}`}>Mahapatra.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="mt-8 max-w-md text-base leading-relaxed text-slate-300"
                >
                  Software engineer fusing backend systems with precision-engineered UX —{" "}
                  <span className="text-[#7cc4e4]">built to stay clean as it grows.</span>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.8 }}
                  className="mt-10 flex flex-wrap items-center justify-center gap-3 @3xl:justify-start"
                >
                  <a
                    href="#engineer-projects"
                    className={`${sora} rounded-full bg-[#4A94BA] px-7 py-3.5 text-xs font-medium uppercase tracking-[0.08em] text-white shadow-[0_0_30px_rgba(74,148,186,0.3)] transition hover:bg-[#5aa5cb]`}
                  >
                    View my work
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    className={`${sora} rounded-full border border-white/15 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.08em] text-white transition hover:border-white/40`}
                  >
                    Let&apos;s talk
                  </a>
                  <a
                    href={GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="rounded-full border border-white/15 p-3 text-slate-300 transition hover:border-white/40 hover:text-white"
                  >
                    <Github size={16} />
                  </a>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative mx-auto aspect-[4/5] w-full max-w-[420px]"
              >
                <div className="absolute -inset-8 rounded-full bg-[#4A94BA]/15 blur-[90px]" />
                <div className={`${card} group relative h-full w-full overflow-hidden p-2`}>
                  <div className="relative h-full w-full overflow-hidden rounded-xl">
                    <Image
                      src="/images/engineer-profile.png"
                      alt="Sampanna Mahapatra"
                      fill
                      priority
                      sizes="(min-width: 768px) 35vw, 90vw"
                      className="object-cover object-top grayscale-[60%] transition duration-1000 group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F111A] via-transparent to-transparent" />
                    <div className={`${mono} absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-slate-300`}>
                      <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        Open to work
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <AnimatePresence>
              {isShrunk && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none absolute inset-0 z-50 flex flex-col items-center justify-between bg-[#0F111A]/95 px-2 py-12 backdrop-blur-xl"
                >
                  <div className="h-12 w-12 rounded-full border border-[#4A94BA]/40 p-1">
                    <Image src="/images/engineer-profile.png" alt="" width={48} height={48} className="h-full w-full rounded-full object-cover grayscale" />
                  </div>
                  <h3 className={`${mono} rotate-180 whitespace-nowrap text-[10px] font-bold uppercase tracking-[1em] text-[#4A94BA]/70 [writing-mode:vertical-lr]`}>
                    Engineer
                  </h3>
                  <Terminal size={14} className="text-[#4A94BA]" />
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* About */}
          <section id="engineer-about" className="mx-auto w-full max-w-6xl px-6 py-24 @3xl:px-14">
            <Reveal>
              <Eyebrow>About</Eyebrow>
              <p className={`${sora} mt-8 max-w-4xl text-[clamp(1.4rem,3.4cqw,2.5rem)] font-light leading-[1.35] tracking-[-0.02em] text-slate-300`}>
                A self-motivated software engineer bridging{" "}
                <span className="font-semibold text-white">complex backend architecture</span> and{" "}
                <span className={`italic ${gradientText}`}>pixel-perfect interfaces</span>. Adaptability and clean code are my core tenets.
              </p>
            </Reveal>
          </section>

          {/* Education & leadership */}
          <section id="engineer-education" className="mx-auto w-full max-w-6xl px-6 py-24 @3xl:px-14">
            <Reveal>
              <SectionHeading
                eyebrow="Journey"
                title="Education &"
                accent="Leadership."
                intro="Computer Science at Northern University Bangladesh, with a focus on data science and years of community leadership alongside it."
              />
            </Reveal>

            <div className="grid gap-5 @3xl:grid-cols-2">
              <Reveal className={`${card} p-7`}>
                <div className="mb-6 flex items-center justify-between">
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5 text-[#4A94BA]">
                    <GraduationCap size={18} />
                  </div>
                  <span className={`${mono} text-[10px] uppercase tracking-[0.25em] text-slate-500`}>2022 — Present</span>
                </div>
                <h3 className={`${sora} text-xl font-semibold text-white`}>B.Sc. in Computer Science & Engineering</h3>
                <p className="mt-1 text-sm text-slate-400">Northern University Bangladesh</p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    ["CGPA", "3.25 / 4.00"],
                    ["Credits", "140 / 152"],
                    ["Focus", "Data Science"],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-xl border border-white/[0.06] bg-black/20 p-3">
                      <p className={`${mono} text-[9px] uppercase tracking-[0.2em] text-slate-500`}>{k}</p>
                      <p className={`${mono} mt-1 text-xs text-slate-200`}>{v}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs leading-relaxed text-slate-500">
                  Coursework: Machine Learning, Operating Systems, Web Programming, AI, Deep Learning, DBMS.
                </p>
                <div className="mt-6 space-y-3 border-t border-white/[0.06] pt-6">
                  {EDUCATION.map((e) => (
                    <div key={e.title} className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-slate-200">{e.title}</p>
                        <p className="text-xs text-slate-500">{e.place}</p>
                      </div>
                      <div className={`${mono} text-right text-[10px] uppercase tracking-[0.15em]`}>
                        <p className="text-slate-500">{e.years}</p>
                        <p className="text-[#7cc4e4]">{e.score}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <div className="flex flex-col gap-5">
                {LEADERSHIP.map((l, i) => (
                  <Reveal key={l.role} className={`${card} group flex gap-5 p-6 transition-colors hover:border-[#4A94BA]/30`}>
                    <div className="h-fit rounded-lg border border-white/10 bg-white/[0.03] p-2.5 text-[#4A94BA]">
                      <l.icon size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className={`${sora} font-semibold text-white`}>{l.role}</h3>
                        <span className={`${mono} text-[10px] text-slate-500`}>{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <p className="text-sm text-slate-400">{l.org}</p>
                      {l.years && <p className={`${mono} mt-2 text-[10px] uppercase tracking-[0.2em] text-[#4A94BA]`}>{l.years}</p>}
                      {l.notes && (
                        <ul className="mt-2 space-y-1 text-xs text-slate-400">
                          {l.notes.map((n) => (
                            <li key={n}>— {n}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Stack */}
          <section id="engineer-skills" className="mx-auto w-full max-w-6xl px-6 py-24 @3xl:px-14">
            <Reveal>
              <SectionHeading eyebrow="Toolkit" title="The Stack" accent="I Build With." intro="From data notebooks to containers to design files — one toolkit, end to end." />
            </Reveal>
            <div className="grid gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
              {STACK.map((s, i) => (
                <Reveal key={s.title} className={`${card} group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#4A94BA]/30`}>
                  <div className="mb-8 flex items-start justify-between">
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5 text-[#4A94BA] transition-colors group-hover:bg-[#4A94BA]/10">
                      <s.icon size={18} />
                    </div>
                    <span className={`${mono} text-[10px] text-slate-600`}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className={`${sora} mb-4 font-semibold text-white`}>{s.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <span key={item} className={`${mono} rounded-full border border-white/[0.08] bg-black/20 px-2.5 py-1 text-[11px] text-slate-300`}>
                        {item}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Work */}
          <section id="engineer-projects" className="mx-auto w-full max-w-6xl px-6 py-24 @3xl:px-14">
            <Reveal>
              <SectionHeading eyebrow="Selected work" title="Things I've" accent="Shipped." />
            </Reveal>
            <div className="grid gap-5 @3xl:grid-cols-2">
              {PROJECTS.map((p) => (
                <Reveal key={p.title} className={`${card} group relative overflow-hidden p-8 transition-colors hover:border-[#4A94BA]/30`}>
                  <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#4A94BA]/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
                  <span className={`${mono} rounded border border-white/10 px-2 py-1 text-[9px] uppercase tracking-[0.25em] text-slate-400`}>
                    {p.status}
                  </span>
                  <h3 className={`${sora} mt-6 text-3xl font-bold tracking-[-0.02em] text-white`}>{p.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">{p.body}</p>
                  <div className="mt-8 flex gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className={`${mono} rounded-full bg-[#4A94BA]/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-[#7cc4e4]`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section id="engineer-contact" className="relative w-full overflow-hidden px-6 py-32 @3xl:px-14">
            <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4A94BA]/10 blur-[120px]" />
            <Reveal className="relative mx-auto max-w-3xl text-center">
              <Eyebrow>Contact</Eyebrow>
              <h2 className={`${sora} mt-6 text-[clamp(2.25rem,6.5cqw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white`}>
                Let&apos;s build
                <br />
                <span className={`italic font-light ${gradientText}`}>something together.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-md text-slate-400">
                Open to new opportunities, scalable architecture challenges and coffee chats.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className={`${sora} inline-flex items-center gap-2 rounded-full bg-[#4A94BA] px-8 py-4 text-xs font-medium uppercase tracking-[0.08em] text-white shadow-[0_0_30px_rgba(74,148,186,0.3)] transition hover:bg-[#5aa5cb]`}
                >
                  <Mail size={14} /> Email me
                </a>
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${sora} inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-xs font-medium uppercase tracking-[0.08em] text-white transition hover:border-white/40`}
                >
                  GitHub <ArrowUpRight size={14} />
                </a>
              </div>
            </Reveal>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
