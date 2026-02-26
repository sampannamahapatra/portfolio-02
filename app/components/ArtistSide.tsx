"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Disc, Play, ArrowRight, Music, AudioLines, Hexagon } from "lucide-react";

export default function ArtistSide({ isActive }: { isActive: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ container: containerRef });

    const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

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
            filter: "blur(10px) grayscale(100%)",
            scale: 0.95,
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };

    const imageVariants: Variants = {
        hidden: { opacity: 0, scale: 1.2, filter: "sepia(100%) blur(10px)" },
        visible: { opacity: 1, scale: 1, filter: "sepia(0%) blur(0px)", transition: { duration: 1.5, ease: "easeOut" } }
    };

    return (
        <div
            ref={containerRef}
            className={`h-full w-full bg-[#0c0a09] text-[#f5f5f4] relative overflow-y-auto overflow-x-hidden flex flex-col font-sans transition-all duration-1000 ${isActive ? '' : 'pointer-events-none'}`}
        >
            {/* Cinematic Grain & Warmth */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] mix-blend-overlay fixed" />
            <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-amber-900/10 via-transparent to-stone-950 fixed" />

            {/* Elegant Top Navigation */}
            <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute top-8 left-1/2 md:left-8 -translate-x-1/2 md:translate-x-0 z-50 flex gap-4 md:gap-8 text-[9px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium text-stone-400 group/nav w-max"
            >
                {['Hero', 'Story', 'Work', 'Contact'].map(item => (
                    <a key={item} href={`#artist-${item.toLowerCase()}`} className="hover:text-amber-500 transition-colors relative overflow-hidden group">
                        {item}
                        <span className="absolute -bottom-1 left-0 w-full h-px bg-amber-500 -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500" />
                    </a>
                ))}
            </motion.nav>

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
                            <AudioLines className="text-amber-600 animate-pulse" size={24} />
                            <span className="text-xs uppercase tracking-[0.4em] text-amber-600/80 font-medium">Bassist & Musician</span>
                        </div>

                        <div className="relative inline-block w-fit group self-center md:self-start">
                            <h1 className="text-[5rem] sm:text-7xl md:text-[9rem] xl:text-[11rem] leading-[0.8] text-stone-200 font-serif italic pr-0 md:pr-4 text-center md:text-left overflow-hidden" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                                <motion.span
                                    initial={{ y: "100%", opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                    className="inline-block"
                                >
                                    Sampanna.
                                </motion.span>
                            </h1>
                            <div className="absolute -inset-x-8 -inset-y-4 bg-amber-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                        </div>
                        <motion.h2
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="text-3xl md:text-5xl text-amber-500/90 font-serif italic mt-6 text-center md:text-left"
                        >
                            The Artist.
                        </motion.h2>

                        <div className="mt-8 sm:mt-12 md:mt-24 max-w-lg mx-auto md:ml-auto md:mr-32 relative md:before:absolute before:-left-8 before:top-2 before:w-px before:h-full before:bg-gradient-to-b before:from-amber-500/50 before:to-transparent text-center md:text-left">
                            <p className="text-xs sm:text-sm md:text-lg font-light leading-relaxed text-stone-400">
                                <strong className="text-stone-200 font-normal">Bass Guitar</strong> is the art of grounding the melody and driving the rhythm.
                                It's a visceral way to tell stories through low frequencies and <span className="text-amber-500/90 font-medium italic select-none">share heavy emotions</span> with the crowd.
                            </p>
                        </div>
                    </motion.div>

                    {/* Center Editorial Image */}
                    <div className="absolute top-[45%] md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-x-[15%] -translate-y-1/2 md:-translate-y-[45%] w-[80%] max-w-[300px] sm:max-w-[400px] md:max-w-[500px] aspect-[1/1.5] z-10 pointer-events-none opacity-40 md:opacity-90 mix-blend-screen mix-blend-luminosity">
                        <motion.div
                            className="w-full h-full rounded-t-[150px] md:rounded-t-[250px] rounded-b-[20px] md:rounded-b-[40px] overflow-hidden relative border border-stone-800"
                            variants={imageVariants}
                            animate={{
                                y: [0, 20, 0],
                                transition: {
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }}
                        >
                            <img
                                src="/images/artist-profile.jpg"
                                alt="Sampanna performing"
                                className="w-full h-full object-cover grayscale-[30%] contrast-125 sepia-[20%] hover:scale-105 transition-transform duration-[2s]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-amber-900/40 mix-blend-overlay" />
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0c0a09] to-transparent" />
                        </motion.div>
                    </div>

                </section>

                {/* Biography Section */}
                <section id="artist-story" className="w-full px-6 md:px-24 py-32 z-20 relative bg-[#0c0a09]">
                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">

                        <div className="w-full md:w-1/3 flex justify-center">
                            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-stone-800 flex items-center justify-center relative spin-slow relative group">
                                <svg className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
                                    <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                                    <text className="text-[10px] uppercase tracking-widest fill-stone-500 font-mono">
                                        <textPath href="#circlePath" startOffset="0%">• The Rhythm Section • Underground Scene</textPath>
                                    </text>
                                </svg>
                                <Hexagon className="text-amber-600/50 group-hover:text-amber-500 transition-colors" size={32} />
                            </div>
                        </div>

                        <div className="w-full md:w-2/3">
                            <span className="text-[10px] tracking-[0.3em] uppercase text-amber-600/80 block mb-6 font-mono">Biography</span>
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
                                    <span key={band} className="px-4 py-2 border border-stone-800 rounded-full text-[10px] uppercase tracking-widest text-stone-500 hover:text-amber-400 hover:border-amber-900 transition-colors cursor-crosshair">
                                        {band}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>

                {/* Discography Section - Vinyl Style */}
                <section id="artist-work" className="w-full px-6 md:px-24 py-32 z-20 relative bg-stone-950 border-t border-stone-900">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-baseline mb-20">
                            <h2 className="text-5xl md:text-7xl text-stone-200 font-serif italic" style={{ fontFamily: 'var(--font-playfair), serif' }}>Discography</h2>
                            <div className="flex items-center gap-2 text-amber-600 mt-6 md:mt-0">
                                <Music size={16} />
                                <span className="text-[10px] tracking-[0.2em] uppercase font-mono">Latest Releases</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                            {[
                                { title: "Bikkhob", artist: "Strive", status: "Upcoming", color: "from-red-950/40" },
                                { title: "Punorutthan", artist: "Warsite", status: "Upcoming", color: "from-amber-950/40" },
                                { title: "Amar Cokher Paane", artist: "Sindhur Pathyatri", status: "Released", color: "from-blue-950/40" },
                                { title: "Bishorjon", artist: "Nikhonj", status: "Released", color: "from-stone-800/40" }
                            ].map((album, i) => (
                                <div key={i} className="group cursor-pointer">
                                    <div className={`aspect-square bg-gradient-to-br ${album.color} to-stone-900 border border-stone-800 mb-6 relative overflow-hidden rounded-sm group-hover:border-stone-600 transition-colors duration-500 shadow-2xl`}>

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
                    <div className="absolute w-[600px] h-[600px] bg-amber-600/5 blur-[150px] rounded-full pointer-events-none" />

                    <h2 className="text-6xl md:text-9xl text-stone-200 mb-12 opacity-40 hover:opacity-100 transition-opacity duration-1000 cursor-pointer font-serif italic relative z-10" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        Let's Create.
                    </h2>

                    <a href="mailto:contact@sampanna.com" className="group relative inline-flex items-center gap-4 text-stone-400 hover:text-amber-500 transition-colors z-10">
                        <span className="uppercase tracking-[0.3em] text-xs font-medium">Send Transmission</span>
                        <span className="w-12 h-px bg-stone-700 group-hover:bg-amber-500 group-hover:w-20 transition-all duration-500" />
                        <ArrowRight size={16} className="-ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-3 transition-all duration-500" />
                    </a>
                </section>

            </motion.div>
        </div>
    );
}
