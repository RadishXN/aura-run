"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";

interface NavbarProps {
  onCartOpen: () => void;
  cartItemsCount: number;
}

export default function Navbar({ onCartOpen, cartItemsCount }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-4 glass shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <span className="text-2xl font-black tracking-tighter text-white transition-all duration-300">
              AURA<span className="text-[#FF4500] text-glow">.</span>RUN
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            {["overview", "features", "customizer", "specs"].map((item) => (
              <button
                key={item}
                onClick={() => handleScrollTo(item)}
                className="text-sm font-medium tracking-wide text-zinc-400 hover:text-white capitalize transition-colors relative py-2 group cursor-pointer"
              >
                {item === "overview" && "概览"}
                {item === "features" && "硬核科技"}
                {item === "customizer" && "极速定制"}
                {item === "specs" && "规格参数"}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF4500] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-6">
            {/* Cart Icon */}
            <button
              onClick={onCartOpen}
              className="relative p-2.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-[#FF4500] hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all duration-300 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-[#FF4500] text-white text-[10px] font-bold rounded-full shadow-[0_0_10px_rgba(255,69,0,0.6)] animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* CTA Button */}
            <button
              onClick={() => handleScrollTo("customizer")}
              className="hidden sm:block px-6 py-2.5 rounded-full bg-[#FF4500] hover:bg-[#ff5714] text-white text-xs font-semibold uppercase tracking-wider shadow-[0_0_20px_rgba(255,69,0,0.3)] hover:shadow-[0_0_25px_rgba(255,69,0,0.5)] transition-all duration-300 cursor-pointer hover:scale-105"
            >
              立即预订
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#030303]/95 backdrop-blur-xl flex flex-col justify-center items-center space-y-8 transition-all duration-500 ease-out md:hidden ${
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        {["overview", "features", "customizer", "specs"].map((item) => (
          <button
            key={item}
            onClick={() => handleScrollTo(item)}
            className="text-2xl font-bold tracking-wider text-zinc-300 hover:text-[#FF4500] transition-colors cursor-pointer"
          >
            {item === "overview" && "Overview 概览"}
            {item === "features" && "Technology 硬核科技"}
            {item === "customizer" && "Customizer 极速定制"}
            {item === "specs" && "Specifications 规格参数"}
          </button>
        ))}
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            handleScrollTo("customizer");
          }}
          className="px-10 py-4 rounded-full bg-[#FF4500] text-white font-semibold shadow-[0_0_30px_rgba(255,69,0,0.4)] transition-all cursor-pointer"
        >
          立即预订
        </button>
      </div>
    </>
  );
}
