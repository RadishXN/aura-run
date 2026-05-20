"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, CreditCard } from "lucide-react";

export interface CartItem {
  id: string;
  name: string;
  basePrice: number;
  accessories: Array<{ name: string; price: number }>;
  totalPrice: number;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const finalTotal = cartItems.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#0a0a0c] border-l border-zinc-900 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-5 h-5 text-[#FF4500]" />
                <h3 className="text-lg font-bold text-white tracking-wide">您的预订清单</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold tracking-wide">清单当前为空</h4>
                    <p className="text-zinc-500 text-xs mt-1 max-w-[200px]">
                      您还没有在定制器中配置并添加任何 AURA RUN 跑步机。
                    </p>
                  </div>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900 flex flex-col justify-between space-y-4 hover:border-zinc-800/80 transition-colors"
                  >
                    {/* Item title and delete */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-white text-sm tracking-wide">
                          {item.name}
                        </h4>
                        <span className="text-[10px] font-bold text-[#FF4500] uppercase tracking-wider block mt-0.5">
                          主机基准价: ¥{item.basePrice.toLocaleString()}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 rounded-lg hover:bg-zinc-900 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Accessories details */}
                    {item.accessories.length > 0 && (
                      <div className="space-y-1.5 pl-3 border-l border-zinc-800">
                        {item.accessories.map((acc, i) => (
                          <div key={i} className="flex justify-between text-[11px] text-zinc-500">
                            <span>+ {acc.name.split(" ")[0]}</span>
                            <span>¥{acc.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Quantity control and total price */}
                    <div className="flex justify-between items-center pt-2 border-t border-zinc-900/60">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1 rounded text-zinc-400 hover:text-white disabled:text-zinc-700 hover:bg-zinc-800 disabled:bg-transparent transition-all cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total price for this item */}
                      <div className="text-right">
                        <span className="text-zinc-500 text-[9px] block uppercase font-bold tracking-widest">
                          单台加总价
                        </span>
                        <span className="text-white text-sm font-extrabold tracking-tight">
                          ¥{(item.totalPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-zinc-900 bg-zinc-950 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>商品总数</span>
                    <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)} 件</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-white tracking-wide">合并预订总额</span>
                    <span className="text-2xl font-black text-[#FF4500] text-glow tracking-tight">
                      ¥{finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full py-4 rounded-full bg-[#FF4500] hover:bg-[#ff5714] text-white text-sm font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(255,69,0,0.3)] hover:shadow-[0_0_40px_rgba(255,69,0,0.5)] transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer hover:scale-[1.02] active:scale-95"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>开始结账预订</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
