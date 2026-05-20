"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Activity, Cpu, ShieldAlert } from "lucide-react";

interface HeroSectionProps {
  onPreOrder: () => void;
}

export default function HeroSection({ onPreOrder }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transformations
  const treadmillScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const treadmillY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const treadmillRotate = useTransform(scrollYProgress, [0, 1], [0, -3]);
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const bgTextScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.6], [0.6, 0.05]);
  const fgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const fgY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);

  // Entrance animations config
  const entranceTransition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }; // Premium easeOutExpo

  return (
    <section
      ref={sectionRef}
      id="overview"
      className="relative h-[110vh] min-h-[850px] w-full flex items-center justify-center bg-[#030303] overflow-hidden"
    >
      {/* Layer 1: Spotlight Background */}
      <div className="absolute inset-0 spotlight z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030303]/80 to-[#030303] z-5 pointer-events-none" />

      {/* Layer 2: Massive Background Text */}
      <motion.div
        style={{
          y: bgTextY,
          scale: bgTextScale,
          opacity: bgTextOpacity,
        }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }}
        className="absolute inset-0 flex flex-col justify-center items-center select-none z-10 pointer-events-none"
      >
        <h1 className="text-[12vw] font-black leading-none tracking-tighter text-center text-zinc-900 flex flex-col items-center">
          <span className="bg-gradient-to-b from-zinc-800 to-zinc-950 bg-clip-text text-transparent">
            MINIMALIST
          </span>
          <span className="bg-gradient-to-b from-zinc-800 to-zinc-950 bg-clip-text text-transparent">
            TREADMILL
          </span>
        </h1>
      </motion.div>

      {/* Layer 3: Treadmill Centerpiece (Breakout Parallax) */}
      <motion.div
        style={{
          scale: treadmillScale,
          y: treadmillY,
          rotate: treadmillRotate,
        }}
        initial={{ y: 200, scale: 0.8, opacity: 0, rotate: 10 }}
        animate={{ y: 0, scale: 1, opacity: 1, rotate: 0 }}
        transition={entranceTransition}
        className="absolute w-[90%] max-w-[950px] h-[55%] flex items-center justify-center z-20 pointer-events-none"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/treadmill_hero.png"
          alt="AURA RUN Smart Treadmill"
          className="w-full h-full object-contain filter drop-shadow-[0_15px_50px_rgba(255,69,0,0.15)]"
        />
      </motion.div>

      {/* Grid Overlay for Premium Tech Feel */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] z-15 pointer-events-none"
        style={{ maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, #000 40%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, #000 40%, transparent 100%)" }}
      />

      {/* Layer 4: Foreground Overlay (CTAs & Selling Points) */}
      <motion.div
        style={{ opacity: fgOpacity, y: fgY }}
        className="absolute inset-0 flex flex-col justify-between items-center px-6 py-28 z-30 pointer-events-auto"
      >
        {/* Top Badges */}
        <div className="flex flex-wrap justify-center gap-3">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...entranceTransition, delay: 0.4 }}
            className="flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-[#FF4500]"
          >
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>智能拟真体感</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...entranceTransition, delay: 0.5 }}
            className="flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-zinc-400"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>双核Whisper电机</span>
          </motion.div>
        </div>

        {/* Bottom CTA Block */}
        <div className="w-full max-w-xl text-center flex flex-col items-center">
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-zinc-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4"
          >
            AURA FITNESS • 极奢未来主义美学
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6 text-glow"
          >
            突破速度与感官的边界
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-md"
          >
            用极奢科技重塑家庭健身体验。碳纤维折叠跑板、全感交互式智能大屏、云感多维减震，为每一次奔跑赋能。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...entranceTransition, delay: 1 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button
              onClick={onPreOrder}
              className="group px-8 py-4 rounded-full bg-[#FF4500] hover:bg-[#ff5714] text-white text-sm font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(255,69,0,0.4)] hover:shadow-[0_0_40px_rgba(255,69,0,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center space-x-2 cursor-pointer"
            >
              <span>立即定制预订</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <div className="text-left py-1 px-4 border-l border-zinc-800">
              <span className="text-zinc-500 text-[10px] block uppercase font-bold tracking-widest">
                限量尝鲜价
              </span>
              <span className="text-white font-extrabold text-xl tracking-tight">
                ¥12,999 <span className="text-xs font-normal text-zinc-500 line-through">¥16,800</span>
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4, y: [0, 8, 0] }}
        transition={{ delay: 1.4, duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-35 flex flex-col items-center"
      >
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500 mb-1">
          向下滚动
        </span>
        <div className="w-1 h-3 rounded-full bg-zinc-700 flex justify-center">
          <div className="w-1 h-1 rounded-full bg-[#FF4500] animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
