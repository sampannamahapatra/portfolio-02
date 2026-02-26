"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Terminal, Cpu, Database, Layout, Briefcase, GraduationCap, Code2, Layers, Rocket, Github, Mail, ExternalLink, ChevronRight } from "lucide-react";

export default function EngineerSide({ isActive }: { isActive: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const contentVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(10px)", scale: 0.95 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }
    },
    shrunk: {
      opacity: 0.3,
      filter: "blur(4px)",
      scale: 0.9,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeOut" } }
  };

  // Modern animated background blobs
  const AmbientBackground = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-emerald-900/10 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDelay: "4s" }} />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`h-full w-full bg-[#030712] text-slate-200 relative overflow-y-auto overflow-x-hidden flex flex-col font-sans scroll-smooth transition-all duration-700 ${isActive ? '' : 'pointer-events-none'}`}
    >
      <AmbientBackground />

      {/* Premium Glass Top Navigation - Now Sticky */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full bg-slate-950/40 backdrop-blur-xl border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)] flex gap-6 text-[10px] uppercase tracking-[0.2em] font-medium text-slate-400 w-max"
      >
        {['Hero', 'About', 'Skills', 'Projects', 'Contact'].map(item => (
          <a key={item} href={`#engineer-${item.toLowerCase()}`} className="hover:text-cyan-400 transition-colors relative group">
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
        <div className="w-px h-4 bg-white/10 mx-1" />
        <button onClick={() => window.location.reload()} className="hover:text-white transition-colors flex items-center gap-2">
          <Rocket size={14} className="text-cyan-500" />
          <span>Reset</span>
        </button>
      </motion.nav>

      <motion.div
        className="relative z-10 w-full flex flex-col items-center justify-between"
        variants={contentVariants}
        initial="hidden"
        animate={isActive ? "visible" : "shrunk"}
      >
        {/* Dynamic Hero Section */}
        <motion.section
          id="engineer-hero"
          className="w-full min-h-screen flex flex-col justify-center px-6 md:px-20 relative pt-20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between h-full relative z-20">
            {/* Left Content */}
            <div className="flex-1 w-full order-2 md:order-1 flex flex-col justify-center mt-8 md:mt-0 relative group text-center md:text-left items-center md:items-start">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <Terminal className="text-cyan-400" size={16} />
                <span className="text-[10px] md:text-xs font-mono text-cyan-400 tracking-widest uppercase bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">System Architect</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-[5rem] lg:text-[6.5rem] font-black uppercase tracking-[-0.05em] mb-4 leading-[0.9] bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-100 to-slate-500 relative">
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                  className="inline-block relative z-10"
                >
                  SAMPANNA
                </motion.span>
                <br />
                <motion.span
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                  className="inline-block relative z-10"
                >
                  MAHAPATRA
                </motion.span>
                {/* Tech Glow Hinter */}
                <div className="absolute top-0 -left-12 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent hidden lg:block" />
              </h1>
              <h2 className="text-lg md:text-2xl font-light tracking-[0.4em] text-cyan-400/80 mb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-cyan-500/30" />
                SOFTWARE ENGINEER
              </h2>

              <p className="text-sm md:text-base text-slate-400 font-light tracking-wide max-w-md border-l border-cyan-500/20 pl-6 leading-relaxed mb-8">
                <span className="text-slate-200 font-medium">Architecting digital resilience.</span><br />
                Fusing high-performance backend systems with precision-engineered UX.
              </p>

              <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto text-center px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-cyan-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] rounded-sm"
                >
                  View Systems
                </motion.a>
                <div className="flex gap-4 md:ml-4">
                  <a href="https://github.com/Sampanna-M" className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-all backdrop-blur-sm">
                    <Github size={18} />
                  </a>
                  <a href="mailto:contact@sampanna.dev" className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-all backdrop-blur-sm">
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Image Content - Larger and X-AI style */}
            <div className="flex-1 w-full order-1 md:order-2 flex items-center justify-center relative mt-16 md:mt-0 px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[320px] sm:max-w-[450px] md:max-w-[550px] aspect-[4/5] group"
              >
                {/* Tech Scanning Effect */}
                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl">
                  <motion.div
                    animate={{ y: ["-100%", "200%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-full h-1/2 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent opacity-50"
                  />
                </div>

                <div className="absolute -inset-10 bg-cyan-500/10 blur-[120px] rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />

                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5 bg-slate-900/40 backdrop-blur-sm p-2 md:p-3 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                  <div className="w-full h-full rounded-xl overflow-hidden relative group-hover:border-cyan-500/30 transition-colors duration-700">
                    <img
                      src="/images/engineer-profile.png"
                      alt="Sampanna Mahapatra"
                      className="w-full h-full object-cover object-top grayscale brightness-75 contrast-125 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-[1.5s] ease-out"
                    />
                    <div className="absolute inset-0 bg-[#030712] mix-blend-overlay opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-90" />
                  </div>
                </div>

                {/* Cyberpunk Corners */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-500/40" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-cyan-500/40" />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* About Section - Glass Panel */}
        <section id="engineer-about" className="w-full max-w-5xl px-6 md:px-20 py-24 relative z-20">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 md:p-12 backdrop-blur-xl relative overflow-hidden group hover:border-white/[0.1] transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full" />

            <div className="flex items-center gap-4 mb-8">
              <Cpu className="text-cyan-500" />
              <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-cyan-500">About System</h3>
            </div>

            <p className="text-xl md:text-3xl text-slate-300 leading-[1.6] font-light max-w-4xl">
              I am an enthusiastic, self-motivated software engineer bridging the gap between <span className="text-cyan-400 font-medium">complex backend architecture</span> and <span className="text-blue-400 font-medium">pixel-perfect frontend interfaces</span>. Adaptability and clean code are my core tenets.
            </p>
          </div>
        </section>

        {/* Education & Experience Split */}
        <section id="engineer-education" className="w-full max-w-6xl px-6 md:px-20 py-16 relative z-20 flex flex-col lg:flex-row gap-12">

          {/* Left Column - Education */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
              <GraduationCap className="text-cyan-500" />
              <h3 className="text-xl font-bold uppercase tracking-widest text-slate-200">Education</h3>
            </div>

            <div className="space-y-6">
              {/* University Card */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/30 transition-colors group relative overflow-hidden">
                <div className="absolute left-0 top-0 w-1 h-full bg-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                  <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">B.Sc. in Computer Science & Eng.</h4>
                  <span className="text-xs font-mono text-cyan-500/70 bg-cyan-500/10 px-2 py-1 rounded">2022 — Present</span>
                </div>
                <div className="text-slate-400 text-sm mb-4">Northern University Bangladesh</div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                    <p className="text-[10px] uppercase text-slate-500 mb-1">CGPA</p>
                    <p className="font-mono text-cyan-400 text-sm">3.25 / 4.00</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                    <p className="text-[10px] uppercase text-slate-500 mb-1">Credits</p>
                    <p className="font-mono text-slate-300 text-sm">140 / 152</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3 border border-white/5 col-span-2 md:col-span-1">
                    <p className="text-[10px] uppercase text-slate-500 mb-1">Focus</p>
                    <p className="font-mono text-slate-300 text-sm">Data Science</p>
                  </div>
                </div>

                <div className="text-xs text-slate-500 leading-relaxed font-mono">
                  <span className="text-slate-400">Coursework:</span> Machine Learning, OS, Web Programming, AI, Deep Learning, DBMS.
                </div>
              </div>

              {/* HSC Card */}
              <div className="flex items-center justify-between p-5 rounded-xl border border-white/[0.05] bg-transparent hover:bg-white/[0.02] transition-colors">
                <div>
                  <h4 className="text-sm font-bold text-slate-200">HSC (Higher Secondary)</h4>
                  <p className="text-xs text-slate-500 mt-1">Jalalabad Cant. Public School</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono text-cyan-500/70 mb-1">2019-2021</p>
                  <p className="text-xs font-mono text-slate-300">GPA: 5.00</p>
                </div>
              </div>

              {/* SSC Card */}
              <div className="flex items-center justify-between p-5 rounded-xl border border-white/[0.05] bg-transparent hover:bg-white/[0.02] transition-colors">
                <div>
                  <h4 className="text-sm font-bold text-slate-200">SSC (Secondary)</h4>
                  <p className="text-xs text-slate-500 mt-1">Habiganj Govt High School</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono text-cyan-500/70 mb-1">2011-2019</p>
                  <p className="text-xs font-mono text-slate-300">GPA: 5.00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Leadership */}
          <div className="flex-1 mt-12 lg:mt-0">
            <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
              <Briefcase className="text-blue-500" />
              <h3 className="text-xl font-bold uppercase tracking-widest text-slate-200">Leadership & Impact</h3>
            </div>

            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">

              {/* Timeline Item 1 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-900 bg-blue-500 group-hover:bg-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2" />
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-blue-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-200 text-sm">Founder & VP</span>
                    <span className="text-[10px] font-mono text-cyan-500">2020-Present</span>
                  </div>
                  <div className="text-xs text-slate-400">Muktanchal Lit. Club</div>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-900 bg-slate-700 group-hover:bg-cyan-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all" />
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-200 text-sm">Exec. Member</span>
                    <span className="text-[10px] font-mono text-slate-500">2023</span>
                  </div>
                  <div className="text-xs text-slate-400">Northern Univ Computer Club</div>
                </div>
              </div>

              {/* Timeline Volunteers */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-900 bg-emerald-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all" />
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <span className="font-bold text-emerald-100 text-sm block mb-1">Humanitarian Works</span>
                  <ul className="text-xs text-emerald-400/70 space-y-1">
                    <li>• Organizer, COVID-19 Charity</li>
                    <li>• Flood Relief Vol. (Sunamganj)</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Technical Skills - Glowing Grid */}
        <section id="engineer-skills" className="w-full max-w-6xl px-6 md:px-20 py-16 relative z-20">
          <div className="flex items-center gap-4 mb-12 justify-center text-center">
            <Layers className="text-cyan-500" />
            <h3 className="text-2xl font-bold uppercase tracking-widest text-slate-200">Tech Stack</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            {[
              { title: "Languages", icon: <Code2 size={16} />, color: "from-cyan-500/20 to-transparent", border: "border-cyan-500/20", items: ['Python', 'Java', 'C++', 'JavaScript', 'SQL'] },
              { title: "Platforms", icon: <Terminal size={16} />, color: "from-blue-500/20 to-transparent", border: "border-blue-500/20", items: ['Linux', 'Git', 'Docker', 'Oracle'] },
              { title: "AI / Data", icon: <Database size={16} />, color: "from-emerald-500/20 to-transparent", border: "border-emerald-500/20", items: ['Colab', 'Roboflow', 'Pandas', 'Jupyter'] },
              { title: "Design", icon: <Layout size={16} />, color: "from-purple-500/20 to-transparent", border: "border-purple-500/20", items: ['Figma', 'Illustrator', 'Canva'] }
            ].map((cat, i) => (
              <div key={i} className={`p-6 rounded-2xl bg-gradient-to-b ${cat.color} border ${cat.border} backdrop-blur-md relative overflow-hidden group hover:-translate-y-1 transition-all duration-300`}>
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-white/10 rounded-lg text-white group-hover:scale-110 transition-transform">{cat.icon}</div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">{cat.title}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map(s => (
                    <span key={s} className="px-3 py-1 bg-black/40 border border-white/10 rounded-full text-slate-300 text-xs font-mono shadow-inner hover:text-white hover:border-white/30 transition-colors cursor-default">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Works - Interactive Cards */}
        <section id="engineer-projects" className="w-full max-w-5xl px-6 md:px-20 py-24 relative z-20">
          <div className="flex items-center gap-4 mb-16 border-b border-white/10 pb-6">
            <Rocket className="text-cyan-500" />
            <h3 className="text-2xl font-bold uppercase tracking-widest text-slate-200">Selected Works</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="group relative rounded-3xl border border-white/10 bg-white/[0.01] overflow-hidden hover:border-cyan-500/50 transition-all duration-500 flex flex-col h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">TFT Game Concept</h4>
                    <ExternalLink className="text-slate-600 group-hover:text-cyan-400 transition-colors" size={20} />
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    Comprehensive graphics design project showcasing intricate visual elements, UI/UX concepts, and game asset integration patterns.
                  </p>
                </div>
                <div className="flex gap-2 text-[10px] font-mono uppercase tracking-wider">
                  <span className="px-3 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">UI/UX</span>
                  <span className="px-3 py-1 rounded bg-white/5 text-slate-400 border border-white/10">Design</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group relative rounded-3xl border border-white/10 bg-white/[0.01] overflow-hidden hover:border-blue-500/50 transition-all duration-500 flex flex-col h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">C++ Phonebook</h4>
                    <Github className="text-slate-600 group-hover:text-blue-400 transition-colors" size={20} />
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    A robust console application handling full CRUD operations for contacts using advanced file management and data structures in C++.
                  </p>
                </div>
                <div className="flex gap-2 text-[10px] font-mono uppercase tracking-wider">
                  <span className="px-3 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">C++</span>
                  <span className="px-3 py-1 rounded bg-white/5 text-slate-400 border border-white/10">Algorithms</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Footer */}
        <section id="engineer-contact" className="w-full px-6 py-32 mt-12 relative z-20 bg-gradient-to-t from-cyan-950/20 to-transparent">
          <div className="max-w-4xl mx-auto text-center border-t border-white/5 pt-20">
            <div className="inline-block p-4 rounded-full bg-cyan-500/10 mb-8 animate-bounce">
              <Mail className="text-cyan-400" size={32} />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Let's build together.</h2>
            <p className="text-slate-400 mb-10 max-w-lg mx-auto">Open for new opportunities, scalable architecture challenges, and coffee chats.</p>

            <a href="mailto:contact@sampanna.dev" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform rounded-full shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]">
              Send Transmission <ChevronRight size={16} />
            </a>
          </div>
        </section>

      </motion.div>
    </div>
  );
}
