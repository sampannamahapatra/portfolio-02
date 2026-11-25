"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { mono, sora } from "./styles";

type Props = {
  src: string;
  poster: string;
  href: string;
  host: string;
};

export default function LiveSiteWindow({ src, poster, href, host }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused && !reduceMotion) {
          video.play().catch(() => setPlaying(false));
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [userPaused, reduceMotion]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setUserPaused(false);
      video.play().catch(() => setPlaying(false));
    } else {
      setUserPaused(true);
      video.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[#4A94BA]/10 opacity-60 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0d14] shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
          <span className={`${mono} ml-3 truncate rounded bg-white/[0.04] px-3 py-1 text-[10px] text-slate-400`}>{host}</span>
          <span className={`${mono} ml-auto flex items-center gap-1.5 text-[9px] uppercase tracking-[0.25em] text-rose-300`}>
            <span className="relative flex h-1.5 w-1.5">
              {playing && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-70" />}
              <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${playing ? "bg-rose-400" : "bg-slate-500"}`} />
            </span>
            {playing ? "Live" : "Paused"}
          </span>
        </div>

        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${host}`} className="relative block aspect-video">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span
            className={`${sora} absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100`}
          >
            Visit haorgrix.com <ArrowUpRight size={13} />
          </span>
        </a>

        <button
          onClick={toggle}
          aria-label={playing ? "Pause preview" : "Play preview"}
          className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-colors hover:border-[#7cc4e4] hover:bg-[#4A94BA]"
        >
          {playing ? <Pause size={15} /> : <Play size={15} className="translate-x-px" />}
        </button>
      </div>
    </motion.div>
  );
}
