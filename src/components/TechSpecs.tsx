"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gauge, Shield, Zap, Maximize, Weight, Compass, Wifi, Radio } from "lucide-react";

interface SpecRowProps {
  icon: React.ReactNode;
  label: string;
  coreVal: string;
  proVal: string;
  delay: number;
}

function SpecRow({ icon, label, coreVal, proVal, delay }: SpecRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className="grid grid-cols-12 py-5 border-b border-zinc-900 items-center hover:bg-zinc-900/20 px-4 rounded-xl transition-colors duration-300 group"
    >
      {/* Parameter Label */}
      <div className="col-span-12 md:col-span-4 flex items-center space-x-3 mb-2 md:mb-0">
        <div className="text-zinc-500 group-hover:text-[#FF4500] transition-colors duration-300">
          {icon}
        </div>
        <span className="text-sm font-bold text-zinc-400 group-hover:text-white transition-colors duration-300">
          {label}
        </span>
      </div>

      {/* Core version values */}
      <div className="col-span-6 md:col-span-4 text-left md:text-center text-sm font-semibold text-zinc-300">
        {coreVal}
      </div>

      {/* Pro version values */}
      <div className="col-span-6 md:col-span-4 text-right md:text-center text-sm font-bold text-[#FF4500] text-glow">
        {proVal}
      </div>
    </motion.div>
  );
}

export default function TechSpecs() {
  const specs = [
    {
      icon: <Zap className="w-5 h-5" />,
      label: "驱动电机 (Motor Platform)",
      coreVal: "4.0 HP Peak 静音变频双轴电机",
      proVal: "5.0 HP Peak 无刷直流暴风电机",
      delay: 0.05,
    },
    {
      icon: <Gauge className="w-5 h-5" />,
      label: "速度范围 (Speed Range)",
      coreVal: "0.8 - 18.0 km/h",
      proVal: "0.8 - 22.0 km/h (专业竞技级)",
      delay: 0.1,
    },
    {
      icon: <Compass className="w-5 h-5" />,
      label: "坡度扬升 (Incline Engine)",
      coreVal: "0% - 15% 液压自动扬升",
      proVal: "0% - 18% 主动式电磁阻力悬挂",
      delay: 0.15,
    },
    {
      icon: <Maximize className="w-5 h-5" />,
      label: "有效跑带面积 (Running Area)",
      coreVal: "1400 × 510 mm",
      proVal: "1520 × 550 mm (加阔商业跑道)",
      delay: 0.2,
    },
    {
      icon: <Weight className="w-5 h-5" />,
      label: "最大承重极限 (Max Weight Limit)",
      coreVal: "150 kg",
      proVal: "180 kg (高强度精钢框架)",
      delay: 0.25,
    },
    {
      icon: <Radio className="w-5 h-5" />,
      label: "智能大中控屏 (Intelligent Screen)",
      coreVal: "21.5英寸 无边框弧形视网膜屏",
      proVal: "27.0英寸 悬浮感 4K AMOLED 超大触屏",
      delay: 0.3,
    },
    {
      icon: <Wifi className="w-5 h-5" />,
      label: "智能物联网互联 (Connectivity)",
      coreVal: "Wi-Fi 6, 蓝牙5.0, NFC极速投屏",
      proVal: "Wi-Fi 6E, 双模蓝牙5.2, Apple Health, Zwift",
      delay: 0.35,
    },
    {
      icon: <Shield className="w-5 h-5" />,
      label: "整机折叠占地 (Folded Footprint)",
      coreVal: "一键气压全折叠 (占地 0.18 m²)",
      proVal: "无级液压阻尼折叠 (占地 0.20 m²)",
      delay: 0.4,
    },
  ];

  return (
    <section id="specs" className="relative py-32 px-6 bg-[#030303]">
      <div className="max-w-5xl mx-auto">
        
        {/* Title Block */}
        <div className="text-center mb-24">
          <span className="text-xs font-bold tracking-[0.3em] text-[#FF4500] uppercase block mb-3">
            TECHNICAL ATTRIBUTES • 详细规格
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
            物理机械与电子交互参数对比
          </h2>
          <p className="text-zinc-500 text-sm max-w-lg mx-auto leading-relaxed">
            极奢品质，数据佐证。对比 AURA RUN 双平台的硬核机械构造参数，解锁专为您优化的家跑性能。
          </p>
        </div>

        {/* Specifications Table Container */}
        <div className="rounded-3xl glass-premium p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-zinc-900 relative overflow-hidden">
          
          {/* Header Row */}
          <div className="grid grid-cols-12 pb-6 border-b border-zinc-800 text-xs font-bold tracking-widest text-zinc-500 uppercase px-4">
            <div className="col-span-12 md:col-span-4 mb-2 md:mb-0">核心硬件参数</div>
            <div className="col-span-6 md:col-span-4 text-left md:text-center">AURA RUN CORE</div>
            <div className="col-span-6 md:col-span-4 text-right md:text-center text-[#FF4500]">AURA RUN PRO</div>
          </div>

          {/* Table rows */}
          <div className="mt-4">
            {specs.map((spec, index) => (
              <SpecRow
                key={index}
                icon={spec.icon}
                label={spec.label}
                coreVal={spec.coreVal}
                proVal={spec.proVal}
                delay={spec.delay}
              />
            ))}
          </div>

          {/* Highlight background elements inside container */}
          <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-zinc-900 filter blur-3xl pointer-events-none z-0" />
          <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-[#FF4500]/5 filter blur-3xl pointer-events-none z-0" />
        </div>
      </div>
    </section>
  );
}
