"use client";

import React, { useState } from "react";
import { Mail, Check, Compass, Shield } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#030303] border-t border-zinc-900 pt-24 pb-12 px-6 overflow-hidden">
      {/* Absolute Glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#FF4500]/2 filter blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand block (Col span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <span 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-2xl font-black tracking-tighter text-white cursor-pointer select-none"
            >
              AURA<span className="text-[#FF4500] text-glow">.</span>RUN
            </span>
            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed max-w-xs">
              AURA Fitness 致力于用最纯粹的极简主义工业 design、澎湃的多轴动力学以及全感官的智能交互，重构全球现代家庭健身体验。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800/60 text-zinc-400 hover:text-[#FF4500] hover:border-[#FF4500]/50 transition-all duration-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800/60 text-zinc-400 hover:text-[#FF4500] hover:border-[#FF4500]/50 transition-all duration-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
              <a href="#" className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800/60 text-zinc-400 hover:text-[#FF4500] hover:border-[#FF4500]/50 transition-all duration-300">
                <Compass className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links block 1 (Col span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest border-l-2 border-[#FF4500] pl-2.5">
              主机与生态 (Products)
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-500 font-medium">
              <li>
                <button onClick={() => handleScrollTo("customizer")} className="hover:text-white transition-colors cursor-pointer">
                  AURA RUN Core
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("customizer")} className="hover:text-white transition-colors cursor-pointer">
                  AURA RUN Pro
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("customizer")} className="hover:text-white transition-colors cursor-pointer">
                  AeroDamp™ 保护地垫
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("customizer")} className="hover:text-white transition-colors cursor-pointer">
                  AeroPulse™ 心率监控胸带
                </button>
              </li>
            </ul>
          </div>

          {/* Quick links block 2 (Col span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest border-l-2 border-[#FF4500] pl-2.5">
              技术专利 (Patents)
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-500 font-medium">
              <li>
                <button onClick={() => handleScrollTo("features")} className="hover:text-white transition-colors cursor-pointer">
                  CloudShock™ 悬挂减震
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("features")} className="hover:text-white transition-colors cursor-pointer">
                  Whisper™ 降噪双动力
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("features")} className="hover:text-white transition-colors cursor-pointer">
                  AURA OS 全感大屏
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("features")} className="hover:text-white transition-colors cursor-pointer">
                  SmartSpace™ 一键全折叠
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter subscription block (Col span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest border-l-2 border-[#FF4500] pl-2.5">
              获取未来内测通道与资讯
            </h4>
            <p className="text-zinc-500 text-xs leading-relaxed">
              订阅我们的内测资讯，第一时间接收限量出厂尊享优惠、软件大版本 OTA 升级通知。
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@address.com"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-full px-5 py-3 text-xs text-white placeholder-zinc-600 focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] outline-none transition-all duration-300 pr-12"
              />
              <button
                type="submit"
                className={`absolute right-1.5 p-2 rounded-full transition-all duration-300 cursor-pointer ${
                  subscribed ? "bg-green-500 text-white" : "bg-[#FF4500] text-white hover:scale-105"
                }`}
              >
                {subscribed ? <Check className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
              </button>
            </form>
            {subscribed && (
              <span className="text-[10px] font-bold text-green-400 animate-pulse block">
                ✓ 订阅成功！尊贵客户内测凭证已载入您的收件箱。
              </span>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-zinc-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
          <div className="flex items-center space-x-1.5">
            <Shield className="w-3.5 h-3.5 text-zinc-600" />
            <span>© 2026 AURA FITNESS INC. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">隐私权政策</a>
            <a href="#" className="hover:text-white transition-colors">销售条款</a>
            <a href="#" className="hover:text-white transition-colors">知识产权声明</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
