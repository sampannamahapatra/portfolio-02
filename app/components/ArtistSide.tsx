"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence, useScroll, Variants } from "framer-motion";
import { Music, AudioLines, Hexagon, ExternalLink, Play, ArrowRight } from "lucide-react";

export default function ArtistSide({ isActive, isShrunk }: { isActive: boolean; isShrunk?: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);

    const contentVariants: Variants = {
        hidden: { opacity: 0, filter: "blur(20px)", scale: 1.05 },
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            transition: { duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }
        },
        shrunk: {
            opacity: 0.15,
            filter: "blur(10px)",
            scale: 0.95,
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };

    const scanLineVariants: Variants = {
        animate: {
            y: ["0%", "100%", "0%"],
            transition: { duration: 8, repeat: Infinity, ease: "linear" }
        }
    };

    return (
        <div
            className={`h-full w-full bg-[#0c0a09] text-[#f5f5f4] relative overflow-hidden flex flex-col font-sans transition-all duration-1000 ${isActive ? '' : 'pointer-events-none'}`}
        >
            {/* Cinematic Grain & Warmth */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] mix-blend-overlay fixed" />
            <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-white/[0.02] via-transparent to-black fixed" />
            
            {/* XAI Inspired Scanning Grid Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
            <motion.div 
                variants={scanLineVariants}
                animate="animate"
                className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-[5] pointer-events-none"
            />

            {/* Elegant Top Navigation - Now Absolute & Centered in Section */}
            {isActive && (
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute top-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-6 px-6 py-2 rounded-full glass-nav shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-[10px] uppercase tracking-[0.3em] font-semibold text-stone-300 w-max max-w-[90%] overflow-x-auto no-scrollbar"
                >
                    <div className="flex items-center gap-4">
                        {['Hero', 'Story', 'Gallery', 'Work', 'Contact'].map(item => (
                            <a key={item} href={`#artist-${item.toLowerCase()}`} className="hover:text-white transition-colors relative overflow-hidden group py-2">
                                {item}
                                <span className="absolute -bottom-1 left-0 w-full h-px bg-white -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500" />
                            </a>
                        ))}
                    </div>
                <div className="w-px h-4 bg-stone-800 hidden sm:block" />
                <button
                    onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="hover:text-white transition-all flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/20 group"
                >
                    <Hexagon size={14} className="text-white/60 group-hover:rotate-180 transition-transform duration-700" />
                    <span className="hidden sm:inline">Back to Top</span>
                </button>
                </motion.nav>
            )}

            <div
                ref={containerRef}
                className="h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
            >
                <motion.div
                    className="relative z-10 w-full flex flex-col"
                    variants={contentVariants}
                    initial="hidden"
                    animate={isActive ? "visible" : "shrunk"}
                >
                {/* Editorial Hero Section */}
                <section id="artist-hero" className="min-h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-24 relative overflow-hidden">

                    <motion.div className="relative z-20 flex flex-col h-full justify-center pt-20">
                        <div className="flex items-center gap-4 mb-4 md:mb-8 ml-2">
                            <AudioLines className="text-white animate-pulse" size={24} />
                            <span className="text-xs uppercase tracking-[0.4em] text-white/50 font-medium">Bassist & Musician</span>
                        </div>

                        <motion.h1
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="text-4xl sm:text-5xl md:text-[4rem] lg:text-[5rem] text-white font-serif italic mt-6 text-center md:text-left leading-none relative flex flex-col"
                            style={{ fontFamily: 'var(--font-playfair), serif' }}
                        >
                            <span className="relative z-10">The Artist.</span>
                            <motion.span 
                                className="absolute -inset-1 bg-white/5 blur-xl -z-10 rounded-full"
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                        </motion.h1>

                        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 mt-12 md:mt-24">
                            {/* Rhythm Section Vinyl Disc - NEW Redesigned */}
                            <motion.a 
                                href="#artist-work"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                                className="flex-none relative group w-[65vw] max-w-[190px] md:max-w-[170px] aspect-square flex items-center justify-center cursor-pointer"
                            >
                                {/* Vinyl Body */}
                                <div className="absolute inset-0 rounded-full bg-[#0a0a0a] shadow-[0_0_40px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.05)] border border-stone-800/50 overflow-hidden">
                                    {/* Grooves */}
                                    {[...Array(12)].map((_, i) => (
                                        <div 
                                            key={i} 
                                            className="absolute inset-0 rounded-full border border-white/[0.03]" 
                                            style={{ margin: `${(i + 1) * 4}%` }} 
                                        />
                                    ))}
                                    {/* Reflection */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent rotate-45" />
                                </div>

                                {/* Central Red Label */}
                                <motion.div 
                                    className="absolute z-10 w-[40%] h-[40%] rounded-full bg-[#dc2626] flex items-center justify-center shadow-inner relative"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                >
                                    {/* Hole */}
                                    <div className="w-2 h-2 rounded-full bg-[#0c0a09] shadow-xl" />
                                    
                                    {/* Link Icon Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-full">
                                        <ExternalLink size={14} className="text-white" />
                                    </div>

                                    {/* Circular Text on Label */}
                                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-2 overflow-visible">
                                        <defs>
                                            <path id="labelPath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                                        </defs>
                                        <text className="fill-white/80 text-[7px] font-mono uppercase tracking-[0.2em] font-bold">
                                            <textPath href="#labelPath" textAnchor="middle" startOffset="50%">
                                                The Rhythm Section • Underground
                                            </textPath>
                                        </text>
                                    </svg>
                                </motion.div>

                                {/* Hover tooltip */}
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Listen to Latest release</span>
                                </div>
                            </motion.a>

                            <div className="flex-1 max-w-lg relative md:before:absolute before:-left-8 before:top-2 before:w-px before:h-full before:bg-gradient-to-b before:from-white/30 before:to-transparent text-center md:text-left">
                                <p className="text-xs sm:text-sm md:text-lg font-light leading-relaxed text-stone-400">
                                    <strong className="text-white font-normal">Bass Guitar</strong> is the art of grounding the melody and driving the rhythm.
                                    It&apos;s a visceral way to tell stories through low frequencies and <span className="text-white/90 font-medium italic select-none">share heavy emotions</span> with the crowd.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Center Editorial Image - Redesigned for Balance */}
                    <div className="absolute top-[45%] md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-x-[5%] -translate-y-1/2 md:-translate-y-[45%] w-[90%] max-w-[380px] sm:max-w-[500px] md:max-w-[650px] lg:max-w-[750px] aspect-[4/5] z-10 pointer-events-none opacity-50 md:opacity-90">
                        <motion.div
                            className="w-full h-full rounded-t-[180px] md:rounded-t-[300px] rounded-b-[30px] md:rounded-b-[60px] overflow-hidden relative border border-stone-800/50 shadow-[0_0_100px_rgba(0,0,0,0.8)]"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: [0, 15, 0]
                            }}
                            transition={{
                                opacity: { duration: 1.5 },
                                scale: { duration: 1.5 },
                                y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                            }}
                        >
                            <img
                                src="/images/artist-profile.jpg"
                                alt="Artist performing"
                                className="w-full h-full object-cover contrast-[1.2] hover:scale-110 transition-transform duration-[3s] ease-out"
                            />
                            {/* X-AI Grain & Overlay */}
                            <div className="absolute inset-0 bg-stone-900/10 pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-white/10 mix-blend-screen opacity-60" />
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/50 to-transparent" />

                            {/* Scanning Pulse */}
                            <motion.div
                                animate={{ opacity: [0.05, 0.15, 0.05] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute inset-0 bg-white/10"
                            />
                        </motion.div>

                        {/* Ornamental Corner Pieces */}
                        <div className="absolute -top-4 -right-4 w-12 h-12 border-t border-r border-white/30 rounded-tr-3xl" />
                        <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b border-l border-white/30 rounded-bl-3xl" />
                    </div>

                    {/* Collapsed Ribbon Mode - NEW */}
                    <AnimatePresence>
                        {isShrunk && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-50 bg-[#0c0a09]/95 backdrop-blur-xl flex flex-col items-center justify-between py-12 px-2 pointer-events-none"
                            >
                                <div className="flex flex-col items-center gap-8">
                                    <div className="w-12 h-12 rounded-full border border-white/10 p-1">
                                        <img src="/images/artist-profile.jpg" alt="Artist Profile Icon" className="w-full h-full object-cover rounded-full grayscale brightness-75" />
                                    </div>
                                    <div className="h-32 w-px bg-gradient-to-b from-transparent via-stone-500/50 to-transparent" />
                                </div>

                                <div className="flex items-center justify-center h-full">
                                    <h3 className="text-[10px] uppercase tracking-[1em] text-stone-400/50 font-bold [writing-mode:vertical-lr] rotate-180 whitespace-nowrap">
                                        Rhythm_Poetry
                                    </h3>
                                </div>

                                <div className="flex flex-col items-center gap-4 opacity-50">
                                    <Music size={14} className="text-stone-400" />
                                    <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </section>

                {/* Biography Section */}
                <section id="artist-story" className="w-full px-6 md:px-24 py-32 z-20 relative bg-[#0c0a09]">
                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">

                        <div className="w-full md:w-1/3 flex justify-center">
                            <div className="w-32 h-32 md:w-56 md:h-56 rounded-full flex items-center justify-center relative group">
                                {/* Base Static Ring */}
                                <div className="absolute inset-0 rounded-full border border-stone-800/20" />
                                
                                {/* Core Hexagon - Static but interactive */}
                                <Hexagon className="text-white/10 group-hover:text-white transition-all duration-1000 relative z-20 scale-75 md:scale-100" size={32} />

                                {/* Layer 1: Slow Clockwise Ring */}
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-full border border-white/[0.03]"
                                />

                                {/* Layer 2: Fast Counter-Clockwise Dash */}
                                <motion.div 
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-4 rounded-full border border-dashed border-stone-600/30 group-hover:border-stone-400/30 transition-colors"
                                />

                                {/* Layer 3: Scanning Arcs (2 segments) */}
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                                    {/* Arc 1 */}
                                    <motion.circle
                                        cx="50"
                                        cy="50"
                                        r="49.5"
                                        stroke="currentColor"
                                        strokeWidth="0.5"
                                        strokeDasharray="40 270"
                                        fill="transparent"
                                        className="text-white/20"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                    />
                                    {/* Arc 2 - Offset & Different Speed */}
                                    <motion.circle
                                        cx="50"
                                        cy="50"
                                        r="47"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        strokeDasharray="15 300"
                                        fill="transparent"
                                        className="text-white/40"
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    />
                                </svg>

                                {/* Layer 4: Orbiting Dots */}
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0"
                                >
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/20 rounded-full blur-[1px]" />
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/40 rounded-full blur-[2px] animate-pulse" />
                                </motion.div>

                                {/* Subtle Pulse Glow */}
                                <motion.div 
                                    animate={{ scale: [1, 1.05, 1], opacity: [0.05, 0.1, 0.05] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute inset-0 rounded-full bg-white/5 blur-2xl -z-10"
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-2/3">
                            <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 block mb-6 font-mono">Biography</span>
                            <h2 className="text-4xl md:text-5xl font-serif italic text-stone-200 mb-8" style={{ fontFamily: 'var(--font-playfair), serif' }}>A Tapestry of Sound</h2>

                            <div className="space-y-6 text-stone-400 font-light text-lg leading-loose">
                                <p>
                                    My musical journey is woven through the vibrant underground scenes of Bangladesh. Currently grounding the profound low end for <strong className="text-amber-50 font-normal">WARSITE</strong> and <strong className="text-amber-50 font-normal">Strive Bangladesh</strong>, I firmly believe bass is the critical bridge between rhythm and melody.
                                </p>
                                <p>
                                    I have previously lent my sonic signature to acts like <span className="italic text-stone-300">Plasmic Knock</span>, <span className="italic text-stone-300">Nikhonj</span>, and stood as a founding member of <span className="italic text-stone-300">Sindhur Pathyatri</span>.
                                </p>
                                <p>
                                    Beyond live performance, I cultivate the next generation of sound as a Guitar Instructor at <span className="border-b border-stone-700 pb-1 text-stone-300">Focus Rising Stars</span>.
                                </p>
                            </div>

                            <div className="mt-12 flex flex-wrap gap-3">
                                {['Warsite', 'Strive', 'Plasmic Knock', 'Nikhonj', 'Sindhur Pathyatri'].map((band) => (
                                    <span key={band} className="px-4 py-2 border border-stone-800 rounded-full text-[10px] uppercase tracking-widest text-stone-500 hover:text-white hover:border-white transition-colors cursor-crosshair">
                                        {band}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>

                {/* Scanned Archives - NEW Gallery Section */}
                <section id="artist-gallery" className="w-full px-6 md:px-24 py-32 z-20 relative bg-[#0c0a09] border-t border-white/5">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center gap-4 mb-16">
                            <span className="text-[10px] tracking-[0.4em] uppercase text-white font-mono">Archive_01</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[1000px]">
                            {/* Large Feature Item */}
                            <motion.div 
                                whileHover={{ scale: 0.99 }}
                                className="md:col-span-8 md:row-span-2 relative overflow-hidden group cursor-pointer rounded-sm border border-white/5"
                            >
                                <img 
                                    src="/images/artist_showcase_1_1775469254138.png" 
                                    className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-110 group-hover:rotate-1 brightness-75 group-hover:brightness-100" 
                                    alt="Live Performance"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-10 left-10">
                                    <span className="text-[10px] font-mono text-white/50 block mb-2 tracking-[0.2em]">01_Performance</span>
                                    <h3 className="text-2xl text-white font-serif italic">The Visceral Response</h3>
                                </div>
                                <motion.div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-white/20 m-4" />
                            </motion.div>

                            {/* Detail Item 1 */}
                            <motion.div 
                                whileHover={{ scale: 0.99 }}
                                className="md:col-span-4 relative overflow-hidden group cursor-pointer rounded-sm border border-white/5"
                            >
                                <img 
                                    src="/images/artist_showcase_2_1775469270702.png" 
                                    className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[1.5s]" 
                                    alt="Instrument Detail"
                                />
                                <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay" />
                                <div className="absolute top-6 left-6">
                                    <span className="text-[8px] font-mono text-white/40 tracking-[0.4em]">Detail_02</span>
                                </div>
                            </motion.div>

                            {/* Detail Item 2 */}
                            <motion.div 
                                whileHover={{ scale: 0.99 }}
                                className="md:col-span-4 relative overflow-hidden group cursor-pointer rounded-sm border border-white/5"
                            >
                                <img 
                                    src="/images/artist_showcase_3_1775469288323.png" 
                                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" 
                                    alt="Studio Session"
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 group-hover:ring-white/30 transition-all" />
                            </motion.div>

                            {/* Medium Feature Item */}
                            <motion.div 
                                whileHover={{ scale: 0.99 }}
                                className="md:col-span-4 md:row-span-1 relative overflow-hidden group cursor-pointer rounded-sm border border-white/5"
                            >
                                <img 
                                    src="/images/artist_showcase_4_1775469303104.png" 
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" 
                                    alt="Concert Energy"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:scale-125 group-hover:border-white/50 transition-all duration-500">
                                        <div className="w-1 h-1 bg-white rounded-full" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Discography Section - Vinyl Style */}
                <section id="artist-work" className="w-full px-6 md:px-24 py-32 z-20 relative bg-stone-950 border-t border-stone-900">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-baseline mb-20">
                            <h2 className="text-5xl md:text-7xl text-stone-200 font-serif italic" style={{ fontFamily: 'var(--font-playfair), serif' }}>Discography</h2>
                            <div className="flex items-center gap-2 text-white/50 mt-6 md:mt-0">
                                <Music size={16} />
                                <span className="text-[10px] tracking-[0.2em] uppercase font-mono">Latest Releases</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                            {[
                                { title: "Bikkhob", artist: "Strive", status: "Upcoming", color: "from-stone-900/80" },
                                { title: "Punorutthan", artist: "Warsite", status: "Upcoming", color: "from-stone-800/80" },
                                { title: "Amar Cokher Paane", artist: "Sindhur Pathyatri", status: "Released", color: "from-stone-700/80" },
                                { title: "Bishorjon", artist: "Nikhonj", status: "Released", color: "from-stone-900/80" }
                            ].map((album, i) => (
                                <div key={i} className="group cursor-pointer">
                                    <div className={`aspect-square bg-gradient-to-br ${album.color} to-stone-950 border border-stone-800 mb-6 relative overflow-hidden rounded-sm group-hover:border-stone-500 transition-colors duration-500 shadow-2xl`}>
                                        {/* XAI Style Scanline for Vinyl */}
                                        <motion.div 
                                            animate={{ y: ["-100%", "200%"] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-x-0 h-px bg-white/10 z-20"
                                        />

                                        {/* Vinyl Record Hover Animation */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full bg-[#0a0a0a] border border-stone-800 shadow-2xl flex items-center justify-center group-hover:translate-x-[10%] group-hover:rotate-180 transition-all duration-700 ease-out">
                                            {/* Vinyl Grooves */}
                                            <div className="absolute inset-1 rounded-full border border-stone-800/50" />
                                            <div className="absolute inset-3 rounded-full border border-stone-800/50" />
                                            <div className="absolute inset-5 rounded-full border border-stone-800/50" />
                                            {/* Label */}
                                            <div className={`w-1/3 h-1/3 rounded-full bg-gradient-to-br ${album.color} to-stone-800 flex items-center justify-center`}>
                                                <div className="w-2 h-2 rounded-full bg-[#0c0a09]" />
                                            </div>
                                        </div>

                                        {/* Play Button */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white pl-1">
                                                <Play fill="currentColor" size={20} />
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl text-stone-200 mb-2 font-serif italic" style={{ fontFamily: 'var(--font-playfair), serif' }}>{album.title}</h3>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] uppercase tracking-widest text-stone-500">{album.artist}</p>
                                        <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 border border-stone-800 text-stone-600 rounded-full">{album.status}</span>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </section>

                {/* Cinematic Contact Footer */}
                <section id="artist-contact" className="w-full px-6 py-40 z-20 relative bg-[#0c0a09] flex flex-col items-center justify-center text-center overflow-hidden">
                    <div className="absolute w-[600px] h-[600px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none" />

                    <h2 className="text-6xl md:text-9xl text-stone-200 mb-12 opacity-40 hover:opacity-100 transition-opacity duration-1000 cursor-pointer font-serif italic relative z-10" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        Let&apos;s Create.
                    </h2>

                    <a href="mailto:booking@theartist.com" className="group relative inline-flex items-center gap-4 text-stone-400 hover:text-white transition-colors z-10">
                        <span className="uppercase tracking-[0.3em] text-xs font-medium">Send Transmission</span>
                        <span className="w-12 h-px bg-stone-700 group-hover:bg-white group-hover:w-20 transition-all duration-500" />
                        <ArrowRight size={16} className="-ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-3 transition-all duration-500" />
                    </a>
                </section>

                </motion.div>
            </div>
        </div>
    );
}
