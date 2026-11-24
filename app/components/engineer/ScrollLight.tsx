"use client";

import { createContext, useContext, useRef, type ReactNode, type RefObject } from "react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

export const ScrollContainerContext = createContext<RefObject<HTMLElement | null> | null>(null);

type Props = {
  children: ReactNode;
  className?: string;
  direction?: "down" | "right";
  dim?: number;
  end?: number;
};

export default function ScrollLight({ children, className = "", direction = "down", dim = 0.18, end = 0.55 }: Props) {
  const container = useContext(ScrollContainerContext);
  const target = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    container: container ?? undefined,
    target,
    offset: ["start 0.92", `end ${end}`],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });

  const edge = useTransform(progress, [0, 1], [-25, 115]);
  const soft = useTransform(edge, (v) => v + 25);
  const axis = direction === "down" ? "to bottom" : "to right";
  const mask = useMotionTemplate`linear-gradient(${axis}, #000 ${edge}%, rgba(0,0,0,${dim}) ${soft}%)`;

  const isHeading = direction === "right";
  const y = useTransform(progress, [0, 1], [isHeading ? 36 : 28, 0]);
  const scale = useTransform(progress, [0, 1], [isHeading ? 0.92 : 1, 1]);
  const letterSpacing = useTransform(progress, [0, 1], [isHeading ? "0.04em" : "0em", "0em"]);
  const blur = useTransform(progress, [0, 0.6], [isHeading ? 6 : 3, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={target}
      className={className}
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
        y,
        scale,
        letterSpacing,
        filter,
        transformOrigin: isHeading ? "left center" : "center top",
      }}
    >
      {children}
    </motion.div>
  );
}
