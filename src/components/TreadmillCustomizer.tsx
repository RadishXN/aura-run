"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShieldCheck, Heart, Radio, Tv, Layers } from "lucide-react";

interface TreadmillCustomizerProps {
  onAddToCart: (item: {
    id: string;
    name: string;
    basePrice: number;
    accessories: Array<{ name: string; price: number }>;
    totalPrice: number;
  }) => void;
}

const MODELS = [
  {
    id: "aura-run-core",
    name: "AURA RUN Core",
    description: "经典家庭极奢版。21.5\" 弧形全息屏，4.0 HP 强悍电机，CloudShock™ 减震系统。",
    price: 12999,
    specs: ["4.0 HP 动力", "21.5 英寸弧形大屏", "CloudShock 减震", "18 km/h 极速"],
  },
  {
    id: "aura-run-pro",
    name: "AURA RUN Pro",
    description: "至尊商业级性能版。加大 27\" 超视网膜屏，5.0 HP 暴风双核电机，主动气垫可变阻尼减震。",
    price: 15999,
    specs: ["5.0 HP 狂暴动力", "27 英寸超清全面屏", "Active-Air 气垫悬挂", "22 km/h 竞技级速度", "自润滑静音跑带"],
  },
];

const ACCESSORIES = [
  {
    id: "mat",
    name: "AeroDamp™ 高回弹吸音减震保护垫",
    description: "专为高楼层设计，吸音减震系数提升 85%，防磨损，深度呵护地板。",
    price: 599,
    icon: <Layers className="w-5 h-5" />,
  },
  {
    id: "strap",
    name: "AeroPulse™ 极速无线心率监控胸带",
    description: "毫秒级心率追踪，高精度射频连接中控屏，心率智能联动调整跑步机坡度。",
    price: 399,
    icon: <Radio className="w-5 h-5" />,
  },
  {
    id: "warranty",
    name: "尊享白金 3年全国保修与上门整备服务",
    description: "3年整机质保，免维修费上门费，定期工程师到府清洁、校准及部件润滑保养。",
    price: 1299,
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    id: "subscription",
    name: "LiveCoach™ 顶级金牌私教直播年卡",
    description: "全球 Top 50 金牌教练每日多时段直播实景授课，沉浸式智能互动，高效燃脂指导。",
    price: 899,
    icon: <Tv className="w-5 h-5" />,
  },
];

export default function TreadmillCustomizer({ onAddToCart }: TreadmillCustomizerProps) {
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [priceSubtotal, setPriceSubtotal] = useState(MODELS[0].price);
  const [isAdded, setIsAdded] = useState(false);

  // Re-calculate price subtotal when model or accessories change
  useEffect(() => {
    let price = selectedModel.price;
    selectedAccessories.forEach((accId) => {
      const acc = ACCESSORIES.find((a) => a.id === accId);
      if (acc) price += acc.price;
    });
    setPriceSubtotal(price);
  }, [selectedModel, selectedAccessories]);

  const handleModelChange = (model: typeof MODELS[0]) => {
    setSelectedModel(model);
  };

  const toggleAccessory = (id: string) => {
    if (selectedAccessories.includes(id)) {
      setSelectedAccessories(selectedAccessories.filter((accId) => accId !== id));
    } else {
      setSelectedAccessories([...selectedAccessories, id]);
    }
  };

  const handleAdd = () => {
    const accList = ACCESSORIES.filter((acc) => selectedAccessories.includes(acc.id)).map((acc) => ({
      name: acc.name,
      price: acc.price,
    }));

    onAddToCart({
      id: `${selectedModel.id}-${selectedAccessories.join("-")}`,
      name: selectedModel.name,
      basePrice: selectedModel.price,
      accessories: accList,
      totalPrice: priceSubtotal,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section id="customizer" className="relative py-32 px-6 bg-zinc-950/70 border-y border-zinc-900">
      <div className="absolute inset-0 spotlight-blue pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-bold tracking-[0.3em] text-[#FF4500] uppercase block mb-3">
            BESPOKE TAILORING • 奢华定制
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
            定制专属您的 AURA 奔跑体验
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto leading-relaxed">
            选择符合您力量需求的动力配置，并添加专属智能配件，体验量身订制的奢华奔跑阻尼及健康管理系统。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Visual Showcase & Active Specs */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="relative aspect-square rounded-3xl bg-zinc-900 border border-zinc-800/80 p-8 flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-radial-gradient from-zinc-800/20 via-transparent to-transparent pointer-events-none" />
              
              {/* Product render */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/treadmill_hero.png"
                alt="AURA RUN Model Customization"
                className="w-full h-full object-contain filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Accessory active tags overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2 justify-center">
                {selectedModel.specs.slice(0, 3).map((spec, i) => (
                  <span
                    key={i}
                    className="text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-black/60 border border-zinc-800 text-zinc-300 backdrop-blur-md"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Config summary card */}
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-md">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">
                您的预订清单摘要
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white font-medium">{selectedModel.name}</span>
                  <span className="text-zinc-400">¥{selectedModel.price.toLocaleString()}</span>
                </div>
                {selectedAccessories.map((accId) => {
                  const acc = ACCESSORIES.find((a) => a.id === accId);
                  if (acc) {
                    return (
                      <div key={accId} className="flex justify-between text-xs text-zinc-400 pl-4 border-l border-zinc-800">
                        <span>+ {acc.name.split(" ")[0]}</span>
                        <span>¥{acc.price.toLocaleString()}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Config Options */}
          <div className="lg:col-span-7 space-y-12">
            {/* Step 1: Select Model */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#FF4500]/20 flex items-center justify-center text-[#FF4500] text-xs font-black">
                  1
                </div>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  选择主机型号 (Select Engine Platform)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MODELS.map((model) => {
                  const isActive = selectedModel.id === model.id;
                  return (
                    <div
                      key={model.id}
                      onClick={() => handleModelChange(model)}
                      className={`p-6 rounded-2xl cursor-pointer border transition-all duration-300 relative flex flex-col justify-between ${
                        isActive
                          ? "bg-zinc-900 border-[#FF4500] shadow-[0_0_20px_rgba(255,69,0,0.15)]"
                          : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute top-4 right-4 p-1 rounded-full bg-[#FF4500] text-white">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                      <div>
                        <h4 className="text-lg font-bold text-white tracking-tight mb-2">
                          {model.name}
                        </h4>
                        <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                          {model.description}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-zinc-800/80 flex items-end justify-between">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                          起售价
                        </span>
                        <span className="text-white font-extrabold text-lg tracking-tight">
                          ¥{model.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Choose Accessories */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#FF4500]/20 flex items-center justify-center text-[#FF4500] text-xs font-black">
                  2
                </div>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  增配高级配件与尊享服务 (Tailor Upgrades)
                </h3>
              </div>

              <div className="space-y-4">
                {ACCESSORIES.map((acc) => {
                  const isChecked = selectedAccessories.includes(acc.id);
                  return (
                    <div
                      key={acc.id}
                      onClick={() => toggleAccessory(acc.id)}
                      className={`p-5 rounded-2xl cursor-pointer border flex items-center justify-between gap-5 transition-all duration-300 ${
                        isChecked
                          ? "bg-zinc-900 border-[#FF4500]/50 shadow-[0_4px_20px_rgba(255,69,0,0.05)]"
                          : "bg-zinc-900/20 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/40"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon Box */}
                        <div className={`p-3 rounded-xl border transition-colors duration-300 ${
                          isChecked ? "bg-[#FF4500]/10 border-[#FF4500]/30 text-[#FF4500]" : "bg-zinc-900 border-zinc-800 text-zinc-500"
                        }`}>
                          {acc.icon}
                        </div>
                        {/* Text */}
                        <div>
                          <h4 className="text-sm font-bold text-white tracking-wide">
                            {acc.name}
                          </h4>
                          <p className="text-zinc-500 text-xs mt-1 leading-relaxed max-w-lg">
                            {acc.description}
                          </p>
                        </div>
                      </div>

                      {/* Price & Checkbox */}
                      <div className="flex items-center gap-4 text-right flex-shrink-0">
                        <div>
                          <span className="text-[10px] text-zinc-500 block uppercase font-bold tracking-widest">
                            加购价
                          </span>
                          <span className={`font-bold text-sm tracking-tight ${isChecked ? "text-white" : "text-zinc-400"}`}>
                            + ¥{acc.price}
                          </span>
                        </div>
                        <div className={`w-6 h-6 rounded-lg border transition-all duration-300 flex items-center justify-center ${
                          isChecked ? "bg-[#FF4500] border-[#FF4500] text-white" : "bg-transparent border-zinc-800"
                        }`}>
                          {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total Panel & Purchase Action */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest block mb-1">
                  定制专属预订总价 (Estimated Total)
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white tracking-tight text-glow transition-all duration-300">
                    ¥{priceSubtotal.toLocaleString()}
                  </span>
                  <span className="text-zinc-500 text-xs line-through">
                    ¥{(priceSubtotal * 1.3).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
                <button
                  onClick={handleAdd}
                  disabled={isAdded}
                  className={`px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 select-none flex items-center justify-center space-x-2 cursor-pointer ${
                    isAdded
                      ? "bg-zinc-800 border border-zinc-700 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                      : "bg-[#FF4500] hover:bg-[#ff5714] text-white shadow-[0_0_30px_rgba(255,69,0,0.3)] hover:shadow-[0_0_40px_rgba(255,69,0,0.5)] hover:scale-105"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>已加入预订购物车</span>
                    </>
                  ) : (
                    <span>加入预订购物车</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
