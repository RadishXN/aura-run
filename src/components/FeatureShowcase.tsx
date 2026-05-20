"use client";

import React from "react";
import { motion } from "framer-motion";
import { Monitor, Zap, Layers, FolderDown, ShieldCheck, HeartPulse } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon, title, subtitle, description, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className="group relative p-8 rounded-3xl glass-premium overflow-hidden transition-all duration-500 hover:border-[#FF4500]/30 hover:shadow-[0_20px_50px_rgba(255,69,0,0.15)] flex flex-col justify-between min-h-[320px] cursor-pointer"
    >
      {/* Dynamic Background Hover Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#FF4500]/5 filter blur-3xl group-hover:bg-[#FF4500]/15 group-hover:scale-125 transition-all duration-700 pointer-events-none" />

      {/* Icon Area */}
      <div className="flex justify-between items-start">
        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-[#FF4500] group-hover:bg-[#FF4500] group-hover:text-white transition-all duration-500 group-hover:scale-110 shadow-lg">
          {icon}
        </div>
        <span className="text-[10px] font-bold tracking-[0.25em] text-zinc-600 group-hover:text-[#FF4500] transition-colors">
          INTELLIGENT TECH
        </span>
      </div>

      {/* Card Text Content */}
      <div className="mt-8">
        <span className="text-[10px] font-bold tracking-widest text-[#FF4500] uppercase block mb-1">
          {subtitle}
        </span>
        <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-glow transition-all duration-300">
          {title}
        </h3>
        <p className="text-zinc-400 text-xs md:text-sm mt-3 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom accent stripe */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-zinc-800 group-hover:bg-[#FF4500] transition-colors duration-500" />
    </motion.div>
  );
}

export default function FeatureShowcase() {
  const features = [
    {
      icon: <Monitor className="w-6 h-6" />,
      subtitle: "Smart Console",
      title: "21.5\" 弧形全息视网膜屏",
      description: "搭载 AURA OS 系统，21.5 英寸无边框微弧玻璃屏，内置世界名师拟真户外路线跑道，实时运动数据及动态教练在线直播，让家奔跑宛如穿越自然。",
      delay: 0.1,
    },
    {
      icon: <Zap className="w-6 h-6" />,
      subtitle: "Silent Drive",
      title: "4.0 HP Whisper™ 静音双动力电机",
      description: "独创双轴动力分配技术，澎湃输出直达 4.0 匹马力。先进的降噪涂层与超静音变频芯片，在 18km/h 极速疾驰时音量依然低于 45 分贝，纯享极致宁静。",
      delay: 0.2,
    },
    {
      icon: <Layers className="w-6 h-6" />,
      subtitle: "Cushioning Tech",
      title: "CloudShock™ 航天悬挂减震系统",
      description: "源于超级跑车空气悬挂灵感，六点式云感双向受力跑板。完美吸收足部冲击力的同时提供充沛的反弹回馈，深度保护膝踝关节，畅享轻云般跑感。",
      delay: 0.3,
    },
    {
      icon: <FolderDown className="w-6 h-6" />,
      subtitle: "Smart Space",
      title: "SmartSpace™ 液压自动折叠收纳",
      description: "为现代极简家居定制。气压杆全自动缓降系统，轻轻一按机器即可在一分钟内缓缓倒下或快速直立折叠。占地不足 0.2 平方米，融于墙角，隐于家居。",
      delay: 0.4,
    },
    {
      icon: <HeartPulse className="w-6 h-6" />,
      subtitle: "Active Health",
      title: "BioPulse™ 智能无感心率监测",
      description: "手柄内嵌新型石墨烯生物电极，在握持时 0.1 秒瞬时反馈心率变化。自适应坡度和阻力，确保心率时刻处于最佳燃脂或心肺强化区间，安全且科学。",
      delay: 0.5,
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      subtitle: "Premium Build",
      title: "CarbonWeave™ 碳纤维精工防爆跑带",
      description: "七层复合精织跑带，表面采用航空级碳纤维编制防滑阻燃层，抗拉力提升 300%。高寿命低损耗自润滑系统，极度防震耐磨，历经万公里依旧如新。",
      delay: 0.6,
    },
  ];

  return (
    <section id="features" className="relative py-32 px-6 bg-[#030303]">
      {/* Background spotlights */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#3b82f6]/3 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#FF4500]/3 filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold tracking-[0.3em] text-[#FF4500] uppercase block mb-3">
              TECHNOLOGY INFUSED • 硬核配置
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
              颠覆传统跑步机<br />的硬核科技与奢华细节
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
            AURA RUN 融合先进的机械动力工程学与前沿交互科技，将家庭运动提升到前所未有的视听、足感和空间极致。
          </p>
        </div>

        {/* Features Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              icon={feature.icon}
              subtitle={feature.subtitle}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
