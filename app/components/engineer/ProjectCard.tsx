"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { mono } from "./styles";

export type Project = {
  title: string;
  kind: string;
  role: string;
  body: string;
  highlights: string[];
  icon: LucideIcon;
  live?: string;
  image?: string;
  imagePosition?: string;
  award?: string;
};

export function hostOf(url: string) {
  return new URL(url).host.replace(/^www\./, "");
}

export function Preview({ project }: { project: Project }) {
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
            style={{ objectPosition: project.imagePosition ?? "top" }}
            className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.06]"
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
