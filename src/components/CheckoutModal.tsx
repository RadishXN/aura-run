"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, CreditCard, CheckCircle2, Lock, Sparkles, Smartphone, Landmark } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onOrderSuccess: () => void;
}

type Step = "form" | "processing" | "success";
type PaymentMethod = "card" | "applepay" | "digital";

export default function CheckoutModal({ isOpen, onClose, totalAmount, onOrderSuccess }: CheckoutModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [processState, setProcessState] = useState(0);

  // Form states
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !phone || !address) return;

    setStep("processing");
    
    // Simulate high-tech step loading
    const timer1 = setTimeout(() => setProcessState(1), 1000);
    const timer2 = setTimeout(() => setProcessState(2), 2200);
    const timer3 = setTimeout(() => {
      setStep("success");
      onOrderSuccess();
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const resetModal = () => {
    setStep("form");
    setProcessState(0);
    setEmail("");
    setName("");
    setPhone("");
    setAddress("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={step === "processing" ? undefined : resetModal}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Content Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#0a0a0c] border border-zinc-800 rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden z-10"
          >
            {/* Close Button */}
            {step !== "processing" && (
              <button
                onClick={resetModal}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-zinc-900 text-zinc-500 hover:text-white transition-colors cursor-pointer z-20"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Step 1: Input Form & Billing Details */}
            {step === "form" && (
              <form onSubmit={handleCheckoutSubmit} className="p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-black text-white tracking-wide flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#FF4500]" />
                    <span>AURA 极速安全结账</span>
                  </h3>
                  <p className="text-zinc-500 text-xs mt-1">
                    完成预订表单。当前处于全球尊享预订期，我们不收取任何中间溢价。
                  </p>
                </div>

                {/* Sub-total summary display */}
                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between items-center">
                  <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">
                    当前预订总金额
                  </span>
                  <span className="text-xl font-black text-[#FF4500] text-glow tracking-tight">
                    ¥{totalAmount.toLocaleString()}
                  </span>
                </div>

                {/* Customer Details */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2">
                    1. 配送与联络信息
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                        您的姓名
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="尊称"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] outline-none transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                        手机号码
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="联系电话"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                      邮箱地址 (发送出库凭证)
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@domain.com"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] outline-none transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                      全国配送及入府安装详细地址
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="北京市朝阳区..."
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Payment Gateway selector */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2">
                    2. 拟真支付平台选择
                  </h4>

                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`py-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
                        paymentMethod === "card"
                          ? "bg-[#FF4500]/10 border-[#FF4500] text-white"
                          : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span className="text-[10px] font-bold tracking-wider">双币信用卡</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("applepay")}
                      className={`py-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
                        paymentMethod === "applepay"
                          ? "bg-[#FF4500]/10 border-[#FF4500] text-white"
                          : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span className="text-[10px] font-bold tracking-wider">Apple Pay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("digital")}
                      className={`py-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
                        paymentMethod === "digital"
                          ? "bg-[#FF4500]/10 border-[#FF4500] text-white"
                          : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <Landmark className="w-4 h-4" />
                      <span className="text-[10px] font-bold tracking-wider">云闪付/扫码</span>
                    </button>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-900 space-y-3">
                      <input
                        type="text"
                        maxLength={19}
                        placeholder="卡号 (4111 2222 3333 4444)"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 outline-none focus:border-zinc-700 transition-colors"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="有效期 (MM/YY)"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 outline-none focus:border-zinc-700 transition-colors"
                        />
                        <input
                          type="password"
                          maxLength={3}
                          placeholder="安全码 (CVC)"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 outline-none focus:border-zinc-700 transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod !== "card" && (
                    <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-900 flex flex-col items-center justify-center text-center py-6">
                      <div className="w-24 h-24 rounded-lg bg-zinc-800 border border-zinc-700 p-2 flex items-center justify-center relative overflow-hidden group">
                        {/* Mock QR Code lines using simple stripes */}
                        <div className="w-full h-full bg-[repeating-linear-gradient(45deg,#000,#000_5px,#fff_5px,#fff_10px)] opacity-30 animate-pulse" />
                        <div className="absolute inset-4 rounded border-2 border-zinc-900 bg-white flex items-center justify-center">
                          <CheckCircle2 className="w-8 h-8 text-zinc-950 animate-bounce" />
                        </div>
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-3 font-semibold">
                        {paymentMethod === "applepay" ? "请唤醒您的 Apple 设备进行感应安全支付" : "请在确认支付后使用手机 App 扫描账单二维码"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Final Order Submit */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#FF4500] hover:bg-[#ff5714] text-white text-xs font-extrabold uppercase tracking-widest shadow-[0_0_30px_rgba(255,69,0,0.3)] hover:shadow-[0_0_40px_rgba(255,69,0,0.5)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>安全确认并预订 • ¥{totalAmount.toLocaleString()}</span>
                </button>

                <div className="flex items-center justify-center gap-1.5 text-zinc-600 text-[10px] font-bold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-BIT SSL 全程高强度军工级通信加密保护</span>
                </div>
              </form>
            )}

            {/* Step 2: High-tech Processing loading state */}
            {step === "processing" && (
              <div className="p-12 flex flex-col items-center justify-center text-center space-y-8 min-h-[450px]">
                {/* Glowing futuristic loading ring */}
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full border-4 border-zinc-900" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-[#FF4500] border-r-[#FF4500]/40 animate-spin" />
                  <div className="absolute inset-4 rounded-full bg-zinc-950 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-[#FF4500] animate-pulse" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-white text-lg font-black tracking-wide">
                    SECURE TRANSACTION...
                  </h3>
                  
                  <div className="h-6 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {processState === 0 && (
                        <motion.span
                          key="0"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-[#FF4500] text-xs font-bold uppercase tracking-wider block"
                        >
                          🔒 正在建立专线加密通道...
                        </motion.span>
                      )}
                      {processState === 1 && (
                        <motion.span
                          key="1"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-[#3b82f6] text-xs font-bold uppercase tracking-wider block"
                        >
                          💳 正在向国际清算行申请安全扣款预授信...
                        </motion.span>
                      )}
                      {processState === 2 && (
                        <motion.span
                          key="2"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-green-400 text-xs font-bold uppercase tracking-wider block animate-pulse"
                        >
                          🏭 扣款成功！正在为您分配整机出厂装配流水号...
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="w-full max-w-[200px] h-1.5 rounded-full bg-zinc-900 overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.5, ease: "linear" }}
                    className="absolute top-0 bottom-0 left-0 bg-[#FF4500]"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Global Successful Reservation Page */}
            {step === "success" && (
              <div className="p-10 flex flex-col items-center justify-center text-center space-y-6">
                {/* Completion Badge */}
                <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 shadow-[0_0_40px_rgba(34,197,94,0.2)] animate-bounce">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-green-400 uppercase tracking-[0.25em] block">
                    RESERVATION COMPLETED • 预定达成
                  </span>
                  <h3 className="text-2xl font-black text-white tracking-wide">
                    恭喜您，成为第 984 位尊享车主
                  </h3>
                  <p className="text-zinc-500 text-xs leading-relaxed max-w-sm mx-auto">
                    我们已成功锁定您的定制跑步机席位。工程师将在一周内与您电联沟通出货周期及到府精准安装排期。
                  </p>
                </div>

                {/* Digital receipt box */}
                <div className="w-full p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-left space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-zinc-800/80">
                    <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                      尊享预约流水凭证
                    </span>
                    <span className="px-2 py-1 rounded bg-[#FF4500]/10 border border-[#FF4500]/30 text-white font-mono text-xs font-bold uppercase tracking-wide">
                      #AURA-X-202605
                    </span>
                  </div>

                  <div className="space-y-2 font-medium text-xs text-zinc-400">
                    <div className="flex justify-between">
                      <span>尊享人</span>
                      <span className="text-white">{name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>联络电话</span>
                      <span className="text-white">{phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>收货地址</span>
                      <span className="text-white truncate max-w-[200px]">{address}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-zinc-800/40">
                      <span className="font-bold text-white">实付总价</span>
                      <span className="font-black text-[#FF4500] text-sm">¥{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Custom Confetti highlight */}
                <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-spin" />
                  <span>已向您 {email} 发送出库保质凭单</span>
                </div>

                <button
                  onClick={resetModal}
                  className="px-10 py-3.5 rounded-full bg-[#FF4500] hover:bg-[#ff5714] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(255,69,0,0.2)] hover:shadow-[0_0_30px_rgba(255,69,0,0.4)] cursor-pointer"
                >
                  回退至主页
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
