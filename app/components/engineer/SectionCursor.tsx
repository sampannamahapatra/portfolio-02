"use client";

import { useEffect, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

export type CursorMode = "default" | "spot" | "lens" | "diamond" | "cross" | "view" | "hello" | "link";

const SIZE: Record<CursorMode, number> = {
  default: 34,
  spot: 220,
  lens: 120,
  diamond: 58,
  cross: 46,
  view: 92,
  hello: 130,
  link: 64,
};

const LABEL: Partial<Record<CursorMode, string>> = { view: "View", hello: "Say hi" };

function modeAt(el: Element | null): CursorMode {
  if (!el) return "default";
  if (el.closest("a, button")) {
    const owner = el.closest<HTMLElement>("[data-cursor]");
    return owner?.dataset.cursor === "view" ? "view" : "link";
  }
  const owner = el.closest<HTMLElement>("[data-cursor]");
  return (owner?.dataset.cursor as CursorMode | undefined) ?? "default";
}

function Shape({ mode }: { mode: CursorMode }) {
  switch (mode) {
    case "spot":
      return <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(124,196,228,0.28),rgba(74,148,186,0.08)_45%,transparent_70%)]" />;
    case "lens":
      return <div className="h-full w-full rounded-full bg-white mix-blend-difference" />;
    case "diamond":
      return (
        <motion.div
          className="h-full w-full rotate-45 border border-[#7cc4e4] shadow-[0_0_18px_rgba(124,196,228,0.5)]"
          animate={{ rotate: [45, 225] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      );
    case "cross":
      return (
        <div className="relative h-full w-full">
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#7cc4e4]" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#7cc4e4]" />
          <span className="absolute inset-[30%] rounded-full border border-[#7cc4e4]/70" />
        </div>
      );
    case "view":
    case "hello":
      return (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#4A94BA] text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_0_40px_rgba(74,148,186,0.55)]">
          {LABEL[mode]}
        </div>
      );
    case "link":
      return <div className="h-full w-full rounded-full border border-[#7cc4e4] bg-[#7cc4e4]/10" />;
    default:
      return <div className="h-full w-full rounded-full border border-white/50" />;
  }
}

export default function SectionCursor({ scope, enabled }: { scope: RefObject<HTMLElement | null>; enabled: boolean }) {
  const [finePointer, setFinePointer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 420, damping: 34, mass: 0.5 });
  const dx = useSpring(x, { stiffness: 1200, damping: 50 });
  const dy = useSpring(y, { stiffness: 1200, damping: 50 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const active = finePointer && enabled;

  useEffect(() => {
    const root = scope.current;
    if (!root || !active) return;
    root.classList.add("custom-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setMode(modeAt(e.target as Element));
    };
    const onLeave = () => setVisible(false);

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.classList.remove("custom-cursor");
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [scope, active, x, y]);

  if (!active || typeof document === "undefined") return null;

  const size = SIZE[mode];

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cursor"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`pointer-events-none fixed left-0 top-0 z-[9999] ${mode === "lens" ? "mix-blend-difference" : ""}`}
        >
          <motion.div style={{ x: sx, y: sy }} className="absolute left-0 top-0">
            <motion.div
              animate={{ width: size, height: size }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="-translate-x-1/2 -translate-y-1/2"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.2 }}
                  className="h-full w-full"
                >
                  <Shape mode={mode} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
          {mode !== "view" && mode !== "hello" && (
            <motion.div style={{ x: dx, y: dy }} className="absolute left-0 top-0">
              <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a5dcf3]" />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
