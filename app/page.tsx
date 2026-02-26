"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import EngineerSide from "./components/EngineerSide";
import ArtistSide from "./components/ArtistSide";
import { Code2, Music } from "lucide-react";

export default function Home() {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeMobileSide, setActiveMobileSide] = useState<"engineer" | "artist">("engineer");

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Premium Apple-like spring physics
  const transition: Transition = { type: "spring", stiffness: 120, damping: 20, mass: 0.8 };
  const curtainTransition: Transition = { duration: 1.8, ease: [0.16, 1, 0.3, 1] }; // Custom cubic-bezier for elegance

  const leftSideVariants: Variants = {
    initial: { width: "50%", opacity: 0 },
    hoverLeft: { width: "65%" },
    hoverRight: { width: "35%" },
    default: { width: "50%", opacity: 1 },
  };

  const rightSideVariants: Variants = {
    initial: { width: "50%", opacity: 0 },
    hoverRight: { width: "65%" },
    hoverLeft: { width: "35%" },
    default: { width: "50%", opacity: 1 },
  };

  const toggleMobileSide = () => {
    setActiveMobileSide((prev) => (prev === "engineer" ? "artist" : "engineer"));
  };

  return (
    <main
      className="flex h-[100dvh] md:h-screen flex-col md:flex-row overflow-hidden bg-black text-[var(--foreground)] relative"
      onMouseMove={() => !isOpen && setIsOpen(true)}
      onClick={() => !isOpen && setIsOpen(true)}
    >
      {/* Interactive Central Divider */}
      {isDesktop && isOpen && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 z-40 bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none"
        >
          {/* Glowing Orb on Divider that follows active side */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-full h-[30vh] blur-md transition-colors duration-700"
            animate={{
              backgroundColor: hoveredSide === "left" ? "rgba(34,211,238,0.5)" : hoveredSide === "right" ? "rgba(245,158,11,0.5)" : "rgba(255,255,255,0.1)",
              opacity: hoveredSide ? 1 : 0.3
            }}
          />
        </motion.div>
      )}

      {/* Intro Curtain */}
      <AnimatePresence>
        {!isOpen && (
          <div className="absolute inset-0 z-50 flex flex-col md:flex-row pointer-events-none">
            {/* Left Curtain */}
            <motion.div
              initial={{ x: "0%", filter: "blur(0px)" }}
              animate={{ x: isOpen ? "-100%" : "0%", filter: isOpen ? "blur(10px)" : "blur(0px)" }}
              exit={{ x: "-100%" }}
              transition={curtainTransition}
              className="w-full md:w-1/2 h-[50vh] md:h-full bg-[#030712] flex items-center justify-center md:justify-end pr-0 md:pr-12 md:border-r border-white/5 relative shadow-[20px_0_50px_rgba(0,0,0,0.5)] z-20"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[0.2em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Sampanna
              </h1>
            </motion.div>

            {/* Right Curtain */}
            <motion.div
              initial={{ x: "0%", filter: "blur(0px)" }}
              animate={{ x: isOpen ? "100%" : "0%", filter: isOpen ? "blur(10px)" : "blur(0px)" }}
              exit={{ x: "100%" }}
              transition={curtainTransition}
              className="w-full md:w-1/2 h-[50vh] md:h-full bg-[#0c0a09] flex items-center justify-center md:justify-start pl-0 md:pl-12 relative shadow-[-20px_0_50px_rgba(0,0,0,0.5)] z-20"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[0.2em] uppercase text-stone-200">
                Mahapatra
              </h1>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Toggle Button */}
      {!isDesktop && isOpen && (
        <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-3">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            key={activeMobileSide}
            className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest text-white whitespace-nowrap"
          >
            Switch to {activeMobileSide === "engineer" ? "Artist" : "Professional"} mode
          </motion.div>
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            onClick={toggleMobileSide}
            className="p-4 rounded-full shadow-2xl backdrop-blur-xl border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 text-white"
            style={{
              background: activeMobileSide === "engineer" ? "linear-gradient(135deg, rgba(15,23,42,0.8), rgba(6,182,212,0.4))" : "linear-gradient(135deg, rgba(28,25,23,0.8), rgba(217,119,6,0.5))",
              boxShadow: activeMobileSide === "engineer" ? "0 10px 30px -10px rgba(6,182,212,0.5)" : "0 10px 30px -10px rgba(245,158,11,0.5)"
            }}
          >
            {activeMobileSide === "engineer" ? <Music size={24} /> : <Code2 size={24} />}
          </motion.button>
        </div>
      )}

      {/* Left Side (Engineer) */}
      <motion.div
        className={`relative flex-1 md:flex-none w-full h-full md:h-screen md:w-1/2 bg-black ${!isDesktop && activeMobileSide !== "engineer" ? "hidden" : "block"}`}
        onMouseEnter={() => isDesktop && setHoveredSide("left")}
        onMouseLeave={() => isDesktop && setHoveredSide(null)}
        animate={isDesktop && isOpen ? (hoveredSide === "left" ? "hoverLeft" : hoveredSide === "right" ? "hoverRight" : "default") : (isOpen ? "default" : "initial")}
        variants={isDesktop ? leftSideVariants : undefined}
        transition={transition}
      >
        {isOpen && <EngineerSide isActive={!isDesktop || hoveredSide === "left" || hoveredSide === null} />}
      </motion.div>

      {/* Right Side (Artist) */}
      <motion.div
        className={`relative flex-1 md:flex-none w-full h-full md:h-screen md:w-1/2 bg-black ${!isDesktop && activeMobileSide !== "artist" ? "hidden" : "block"}`}
        onMouseEnter={() => isDesktop && setHoveredSide("right")}
        onMouseLeave={() => isDesktop && setHoveredSide(null)}
        animate={isDesktop && isOpen ? (hoveredSide === "right" ? "hoverRight" : hoveredSide === "left" ? "hoverLeft" : "default") : (isOpen ? "default" : "initial")}
        variants={isDesktop ? rightSideVariants : undefined}
        transition={transition}
      >
        {isOpen && <ArtistSide isActive={!isDesktop || hoveredSide === "right" || hoveredSide === null} />}
      </motion.div>

    </main>
  );
}
