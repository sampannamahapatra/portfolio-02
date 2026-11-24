"use client";

import { createContext, useContext, useRef, type ReactNode, type RefObject } from "react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";

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

  const edge = useTransform(scrollYProgress, [0, 1], [-25, 115]);
  const soft = useTransform(edge, (v) => v + 25);
  const axis = direction === "down" ? "to bottom" : "to right";
  const mask = useMotionTemplate`linear-gradient(${axis}, #000 ${edge}%, rgba(0,0,0,${dim}) ${soft}%)`;

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div ref={target} className={className} style={{ maskImage: mask, WebkitMaskImage: mask }}>
      {children}
    </motion.div>
  );
}
