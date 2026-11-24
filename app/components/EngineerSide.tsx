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
  AudioWaveform,
  Building2,
  Drama,
  Factory,
  Guitar,
  Plug,
  ScanText,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import ParticleField from "./engineer/ParticleField";
import ProjectCard, { type Project } from "./engineer/ProjectCard";
import { card, gradientText, mono, sora } from "./engineer/styles";
import ScrollLight, { ScrollContainerContext } from "./engineer/ScrollLight";

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
  { title: "HSC (Higher Secondary)", place: "Jalalabad Cant. Public School", years: "2019-2021", score: "GPA 5.00" },
  { title: "SSC (Secondary)", place: "Habiganj Govt High School", years: "2011-2019", score: "GPA 5.00" },
];

const LEADERSHIP: { role: string; org: string; years: string; icon: LucideIcon; notes?: string[] }[] = [
  { role: "Founder & VP", org: "Muktanchal Lit. Club", years: "2020-Present", icon: Users },
  { role: "Executive Member", org: "Northern University Computer Club", years: "2023", icon: Users },
  {
    role: "Humanitarian Work",
    org: "Volunteer",
    years: "",
    icon: HeartHandshake,
    notes: ["Organizer, COVID-19 Charity", "Flood Relief Volunteer (Sunamganj)"],
  },
];

const CLIENT_PROJECTS: Project[] = [
  {
    title: "Skin Theory BD",
    kind: "E-commerce · Beauty",
    role: "Project lead",
    icon: ShoppingBag,
    body: "I led this skincare brand's online store and built the major part of it, from shopper accounts to analytics to running it on our own servers.",
    highlights: [
      "Shopper accounts, code-based password reset, order history",
      "Real reviews with admin moderation, private coupons, combo deals",
      "Google Tag Manager ecommerce tracking, WebP image pipeline, self-hosted backend",
    ],
    live: "https://www.skintheorybd.shop",
    image: "/images/work/skin-theory.jpg",
  },
  {
    title: "Hira Bakery ERP",
    kind: "Factory management",
    role: "Built end to end",
    icon: Factory,
    body: "I designed and built this operations system on my own: sales, approvals, records and reports for a multi-factory bakery.",
    highlights: [
      "Role-based permissions, login lockout, finance-only cost data",
      "Manager approvals for discounts and credit overrides",
      "Searchable, filterable, exportable tables and A4 print-ready reports",
    ],
    live: "https://hira.haorgrix.com",
    image: "/images/work/hira-erp.jpg",
    imagePosition: "center 45%",
  },
  {
    title: "Bangladesh Theatre Caravan 2026",
    kind: "Festival website",
    role: "Ongoing contributor",
    icon: Drama,
    body: "I contribute continuously to this international theatre festival's site, keeping it secure, fast and up to date.",
    highlights: [
      "Closed security audit findings: RCE patch, privacy, atomic deploys",
      "CI audit gate that keeps working as npm retires its audit endpoint",
      "Social card fix so WhatsApp shows link previews; ongoing content updates",
    ],
    live: "https://bangladeshtheatrecaravan2026.com",
    image: "/images/work/theatre-caravan.jpg",
    imagePosition: "left top",
  },
];

const OTHER_PROJECTS: Project[] = [
  {
    title: "MONOLITH",
    kind: "E-commerce · Instruments",
    role: "Built solo",
    icon: Guitar,
    award: "Winner, HaorGrix front-end website design competition",
    body: "A musical instrument storefront I designed and built alone.",
    highlights: ["Storefront, cart isolation and polished auth flows", "Producer pages and mobile-first UX"],
  },
  {
    title: "ExamForge AI",
    kind: "AI · Document engine",
    role: "Built solo",
    icon: ScanText,
    body: "An engine that turns exam PDFs into digital tests, built alone end to end.",
    highlights: [
      "Geometry-anchored question segmenter with hybrid text/image rendering",
      "Math digitizer with continuous learning and admin review",
    ],
  },
  {
    title: "HaorGrix Office",
    kind: "Internal platform",
    role: "Contributor",
    icon: Building2,
    body: "The company's virtual office: attendance, chat, files, finance and notices.",
    highlights: [
      "Multi-session attendance with a 6 AM Bangladesh workday boundary",
      "Chat replies, reactions, channel membership and admins",
      "Office and personal file drive, finance Books tab, notice-board polls",
    ],
    live: "https://office.haorgrix.com",
    image: "/images/work/haorgrix-office.jpg",
    imagePosition: "center 62%",
  },
  {
    title: "haorgrix.com Tools",
    kind: "Web tools",
    role: "Contributor",
    icon: AudioWaveform,
    body: "Work on the company's free in-browser tools suite, including the Audio & Video tool.",
    highlights: [
      "Contributions to the Audio & Video tool",
      "Server-rendered hero and a faster largest-paint path",
      "Layout-shift fixes, structured data and the tools sitemap",
    ],
    live: "https://haorgrix.com/tools",
    image: "/images/work/haorgrix-tools.jpg",
  },
  {
    title: "MCP Servers",
    kind: "AI tooling",
    role: "Contributor · in progress",
    icon: Plug,
    body: "Model Context Protocol servers the team's AI agents use. My work here is early and ongoing.",
    highlights: ["SEO technical baseline and KPI data-pull diagnostics"],
  },
];

const EARLIER_PROJECTS = [
  { title: "TFT Game Concept", body: "Graphics and UI/UX concept for a game, with asset integration patterns.", tags: ["UI/UX", "Design"] },
  { title: "C++ Phonebook", body: "Console app with full contact CRUD on file storage and core data structures.", tags: ["C++", "Algorithms"] },
];


function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={`${mono} inline-flex items-center gap-2.5 rounded-full border border-[#4A94BA]/35 bg-[#4A94BA]/10 px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.28em] text-[#a5dcf3] shadow-[0_0_24px_rgba(74,148,186,0.15)]`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#7cc4e4] shadow-[0_0_8px_#7cc4e4]" />
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
        <ScrollLight direction="right" dim={0.12}>
          <h2 className={`${sora} mt-5 text-[clamp(2rem,5.5cqw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white`}>
            {title}
            <br />
            <span className={`italic font-light ${gradientText}`}>{accent}</span>
          </h2>
        </ScrollLight>
      </div>
      {intro && (
        <ScrollLight className="max-w-sm">
          <p className="text-sm leading-relaxed text-slate-400 @3xl:text-right">{intro}</p>
        </ScrollLight>
      )}
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

      {isActive && (
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          aria-label="Engineer sections"
          className="absolute left-1/2 top-5 z-[100] flex w-max max-w-[94%] -translate-x-1/2 items-center gap-3.5 overflow-x-auto [scrollbar-width:none] rounded-full sm:gap-5 border border-white/[0.06] bg-[#0F111A]/80 px-5 py-2 backdrop-blur-md"
        >
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`${sora} shrink-0 py-1.5 text-[10px] font-medium uppercase tracking-[0.06em] text-slate-400 sm:text-[11px] sm:tracking-[0.12em] transition-colors hover:text-white`}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="hidden shrink-0 rounded-full bg-[#4A94BA] p-1.5 text-white sm:block shadow-[0_0_20px_rgba(74,148,186,0.35)] transition-transform hover:-translate-y-0.5"
          >
            <ArrowUp size={14} />
          </button>
        </motion.nav>
      )}

      <ScrollContainerContext.Provider value={containerRef}>
      <div ref={containerRef} className="h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth">
        <motion.div
          className="@container relative z-10 w-full"
          variants={contentVariants}
          initial="hidden"
          animate={isActive ? "visible" : "shrunk"}
        >
          {/* Hero */}
          <section id="engineer-hero" className="relative flex min-h-screen w-full items-center px-6 pb-16 pt-28 @3xl:px-14">
            <div className="absolute inset-0 opacity-90 [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_95%)]">
              <ParticleField />
            </div>

            <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 @3xl:grid-cols-[1.15fr_0.85fr]">
              <div className="flex flex-col items-center text-center @3xl:items-start @3xl:text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`${sora} text-[clamp(2.5rem,8cqw,5.5rem)] font-bold leading-[1] tracking-[-0.04em] text-white`}
                >
                  Sampanna
                  <br />
                  Mahapatra<span className="text-[#4A94BA]">.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="mt-8 max-w-md text-base leading-relaxed text-slate-300"
                >
                  Full-stack and machine learning engineer building disciplined backends, applied AI, and sharp interfaces,{" "}
                  <span className="text-[#7cc4e4]">designed to scale without compounding debt.</span>
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
              <div className="mb-12">
                <ScrollLight direction="right" dim={0.12}>
                  <h2 className={`${sora} mb-5 text-[clamp(2.5rem,7cqw,5rem)] font-bold leading-[1] tracking-[-0.04em] text-white`}>
                    About<span className="text-[#4A94BA]">.</span>
                  </h2>
                </ScrollLight>
                <Eyebrow>The Person Behind the Code</Eyebrow>
              </div>
              <ScrollLight>
              <p className={`${sora} max-w-4xl text-[clamp(1.25rem,2.8cqw,2.1rem)] font-light leading-[1.4] tracking-[-0.02em] text-slate-300`}>
                I&apos;m <span className="font-semibold text-white">Sampanna Mahapatra</span>, a full-stack and machine learning engineer, visual
                designer, and <span className={`italic ${gradientText}`}>Co-Founder &amp; COO at HaorGrix</span>. I specialize in building{" "}
                <span className="font-semibold text-white">resilient software</span>, intelligent data pipelines, and high-contrast interfaces
                that turn complex workflows into intuitive experiences.
              </p>
              </ScrollLight>
              <ScrollLight>
              <p className="mt-8 max-w-3xl text-base leading-relaxed text-slate-400 @3xl:text-lg">
                From shipping production web and enterprise systems to researching audio-driven generative AI, I build with a simple standard:{" "}
                <span className="text-slate-200">engineer for scale, design with restraint, and leave zero unnecessary complexity behind.</span>{" "}
                When I&apos;m off the clock, I&apos;m usually writing heavy music on guitar and bass or crafting risograph-inspired visuals in
                Dhaka.
              </p>
              </ScrollLight>
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
                  <span className={`${mono} text-[10px] uppercase tracking-[0.25em] text-slate-500`}>2022-Present</span>
                </div>
                <h3 className={`${sora} text-xl font-semibold text-white`}>B.Sc. in Computer Science & Engineering</h3>
                <p className="mt-1 text-sm text-slate-400">Northern University Bangladesh</p>
                <div className="mt-6 grid grid-cols-2 gap-3 @md:grid-cols-3">
                  {[
                    ["CGPA", "3.25 / 4.00"],
                    ["Credits", "140 / 152"],
                    ["Focus", "Data Science"],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-xl border border-white/[0.06] bg-black/20 p-3 last:col-span-2 @md:last:col-span-1">
                      <p className={`${mono} text-[9px] uppercase tracking-[0.2em] text-slate-500`}>{k}</p>
                      <p className={`${mono} mt-1 whitespace-nowrap text-xs text-slate-200`}>{v}</p>
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
                            <li key={n}>{n}</li>
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
              <SectionHeading eyebrow="Toolkit" title="The Stack" accent="I Build With." intro="From data notebooks to containers to design files: one toolkit, end to end." />
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
              <SectionHeading
                eyebrow="Selected work"
                title="Things I've"
                accent="Shipped."
                intro="Production work at HaorGrix: client products in the wild, internal platforms and independent builds."
              />
            </Reveal>

            <Reveal>
              <h3 className={`${mono} mb-5 text-[11px] uppercase tracking-[0.3em] text-slate-500`}>
                Client products <span className="text-slate-700">/ 0{CLIENT_PROJECTS.length}</span>
              </h3>
            </Reveal>
            <div className="grid gap-5 @3xl:grid-cols-2 @6xl:grid-cols-3">
              {CLIENT_PROJECTS.map((p) => (
                <ProjectCard key={p.title} project={p} featured />
              ))}
            </div>

            <Reveal>
              <h3 className={`${mono} mb-5 mt-16 text-[11px] uppercase tracking-[0.3em] text-slate-500`}>
                HaorGrix & independent builds <span className="text-slate-700">/ 0{OTHER_PROJECTS.length}</span>
              </h3>
            </Reveal>
            <div className="grid gap-5 @3xl:grid-cols-2 @6xl:grid-cols-3">
              {OTHER_PROJECTS.map((p) => (
                <ProjectCard key={p.title} project={p} />
              ))}
            </div>

            <Reveal>
              <h3 className={`${mono} mb-5 mt-16 text-[11px] uppercase tracking-[0.3em] text-slate-500`}>University course projects</h3>
            </Reveal>
            <div className="grid gap-4 @3xl:grid-cols-2">
              {EARLIER_PROJECTS.map((p) => (
                <Reveal key={p.title} className={`${card} flex items-start justify-between gap-4 p-5`}>
                  <div>
                    <h4 className={`${sora} font-semibold text-white`}>{p.title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{p.body}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className={`${mono} text-[9px] uppercase tracking-[0.2em] text-slate-500`}>
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
              <ScrollLight direction="right" dim={0.12} end={0.95}>
                <h2 className={`${sora} mt-6 text-[clamp(2.25rem,6.5cqw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white`}>
                  Let&apos;s build
                  <br />
                  <span className={`italic font-light ${gradientText}`}>something together.</span>
                </h2>
              </ScrollLight>
              <ScrollLight end={0.95}>
                <p className="mx-auto mt-6 max-w-md text-slate-400">
                  Open to new opportunities, scalable architecture challenges and coffee chats.
                </p>
              </ScrollLight>
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
      </ScrollContainerContext.Provider>
    </div>
  );
}
