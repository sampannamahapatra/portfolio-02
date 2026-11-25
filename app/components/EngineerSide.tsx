"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  Github,
  Mail,
  Terminal,
  AudioWaveform,
  Building2,
  Drama,
  Factory,
  Guitar,
  Plug,
  ScanText,
  ShoppingBag,
} from "lucide-react";
import ParticleField from "./engineer/ParticleField";
import { type Project } from "./engineer/ProjectCard";
import StackedWork from "./engineer/StackedWork";
import { card, gradientText, mono, sora } from "./engineer/styles";
import ScrollLight, { ScrollContainerContext } from "./engineer/ScrollLight";
import SectionCursor from "./engineer/SectionCursor";
import Journey from "./engineer/Journey";
import LiveSiteWindow from "./engineer/LiveSiteWindow";

const EMAIL = "sampannamahapatra6@gmail.com";
const GITHUB = "https://github.com/sampannamahapatra";
const HAORGRIX_PROFILE = "https://haorgrix.com/team/sampanna-mahapatra";

const HAORGRIX_LINKS = [
  { label: "My profile", display: "haorgrix.com/team/sampanna-mahapatra", href: HAORGRIX_PROFILE },
  { label: "Meet the team", display: "haorgrix.com/team", href: "https://haorgrix.com/team" },
];

const NAV = [
  { label: "About", id: "engineer-about" },
  { label: "HaorGrix", id: "engineer-haorgrix" },
  { label: "Work", id: "engineer-projects" },
  { label: "Contact", id: "engineer-contact" },
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
  const rootRef = useRef<HTMLDivElement>(null);

  const contentVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] } },
    shrunk: { opacity: 0.3, scale: 0.97, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div
      ref={rootRef}
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

      <SectionCursor scope={rootRef} enabled={isActive && !isShrunk} />
      <ScrollContainerContext.Provider value={containerRef}>
      <div ref={containerRef} className="h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth">
        <motion.div
          className="@container relative z-10 w-full"
          variants={contentVariants}
          initial="hidden"
          animate={isActive ? "visible" : "shrunk"}
        >
          {/* Hero */}
          <section id="engineer-hero" data-cursor="spot" className="relative flex min-h-screen w-full items-center px-6 pb-16 pt-28 @3xl:px-14">
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
          <section id="engineer-about" data-cursor="lens" className="mx-auto w-full max-w-6xl px-6 pb-12 pt-24 @3xl:px-14">
            <Reveal>
              <div className="mb-12">
                <ScrollLight direction="right" dim={0.12}>
                  <h2 className={`${sora} mb-5 text-[clamp(2.5rem,7cqw,5rem)] font-bold leading-[1] tracking-[-0.04em] text-white`}>
                    About<span className="text-[#4A94BA]">.</span>
                  </h2>
                </ScrollLight>
                <div className="flex flex-wrap items-center gap-3">
                  <Eyebrow>The Person Behind the Code</Eyebrow>
                  <nav aria-label="About pages" className={`${mono} flex items-center gap-1 rounded-full border border-white/[0.08] p-1 text-[11px] uppercase tracking-[0.2em]`}>
                    <a href="#engineer-about" className="rounded-full bg-white/[0.08] px-3 py-1.5 text-white">
                      Profile
                    </a>
                    <a href="#engineer-education" className="rounded-full px-3 py-1.5 text-slate-400 transition-colors hover:text-white">
                      Journey
                    </a>
                  </nav>
                </div>
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
          <section id="engineer-education" className="mx-auto w-full max-w-6xl px-6 pb-24 pt-12 @3xl:px-14">
            <div className="mb-14 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <Reveal>
              <SectionHeading
                eyebrow="About · Journey"
                title="The Route"
                accent="So Far."
                intro="Schools, clubs and causes that shaped me. Tap any stop with a pin to see where it happened."
              />
            </Reveal>

            <Journey />
          </section>

          {/* HaorGrix */}
          <section id="engineer-haorgrix" data-cursor="diamond" className="mx-auto w-full max-w-6xl px-6 py-24 @3xl:px-14">
            <Reveal>
              <ScrollLight direction="right" dim={0.12}>
                <h2 className={`${sora} mb-5 text-[clamp(3rem,10cqw,7.5rem)] font-bold leading-[0.95] tracking-[-0.05em] text-white`}>
                  HaorGrix<span className="text-[#4A94BA]">.</span>
                </h2>
              </ScrollLight>
              <Eyebrow>Co-Founder &amp; Chief Operating Officer</Eyebrow>
            </Reveal>

            <div className="mt-14 grid items-center gap-10 @4xl:grid-cols-[1.05fr_0.95fr]">
              <Reveal>
                <a
                  href={HAORGRIX_PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0d14] shadow-[0_30px_80px_rgba(0,0,0,0.5)] transition-colors hover:border-[#4A94BA]/40"
                >
                  <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
                    <span className={`${mono} ml-3 truncate rounded bg-white/[0.04] px-3 py-1 text-[10px] text-slate-400`}>
                      haorgrix.com/team/sampanna-mahapatra
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="ml-auto text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                    />
                  </div>
                  <div className="relative aspect-[1100/686] overflow-hidden">
                    <Image
                      src="/images/work/haorgrix-profile.jpg"
                      alt="Sampanna Mahapatra on the HaorGrix team page"
                      fill
                      sizes="(min-width: 1024px) 40vw, 90vw"
                      className="object-cover object-top transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                </a>
              </Reveal>

              <div className="space-y-6">
                <ScrollLight>
                  <p className={`${sora} text-[clamp(1.2rem,2.3cqw,1.75rem)] font-light leading-[1.45] tracking-[-0.01em] text-slate-300`}>
                    I co-founded <span className="font-semibold text-white">HaorGrix</span> and lead its operations as{" "}
                    <span className={`italic ${gradientText}`}>Chief Operating Officer</span>: a firm building software and AI systems for
                    global enterprises.
                  </p>
                </ScrollLight>
                <ScrollLight>
                  <p className="text-base leading-relaxed text-slate-400">
                    Alongside running operations, I build. The client products, internal platforms and tools in my work below were shipped
                    with the HaorGrix team.
                  </p>
                </ScrollLight>
              </div>
            </div>

            <div className="mt-16 border-t border-white/[0.08]">
              {HAORGRIX_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-6 border-b border-white/[0.08] py-7"
                >
                  <span
                    className={`${sora} text-[clamp(1.75rem,4.5cqw,3.25rem)] font-semibold tracking-[-0.03em] text-slate-300 transition-all duration-500 group-hover:translate-x-3 group-hover:text-white`}
                  >
                    {l.label}
                  </span>
                  <span
                    className={`${mono} flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-slate-500 transition-colors group-hover:text-[#7cc4e4]`}
                  >
                    <span className="hidden @xl:inline">{l.display}</span>
                    <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-12">
              <LiveSiteWindow
                src="/videos/haorgrix-hero.mp4"
                poster="/videos/haorgrix-hero-poster.jpg"
                href="https://haorgrix.com"
                host="haorgrix.com"
              />
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

            <StackedWork
              chapters={[
                { label: "Client products", projects: CLIENT_PROJECTS },
                { label: "HaorGrix & independent builds", projects: OTHER_PROJECTS },
              ]}
            />

            <Reveal>
              <h3 className={`${mono} mb-5 mt-24 text-[11px] uppercase tracking-[0.3em] text-slate-500`}>University course projects</h3>
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
          <section id="engineer-contact" data-cursor="hello" className="relative w-full overflow-hidden px-6 py-32 @3xl:px-14">
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
