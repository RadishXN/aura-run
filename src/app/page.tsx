"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureShowcase from "@/components/FeatureShowcase";
import TreadmillCustomizer from "@/components/TreadmillCustomizer";
import TechSpecs from "@/components/TechSpecs";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleAddToCart = (newItem: {
    id: string;
    name: string;
    basePrice: number;
    accessories: Array<{ name: string; price: number }>;
    totalPrice: number;
  }) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === newItem.id);

      if (existingItemIndex > -1) {
        // Increment quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });

    // Automatically slide open cart drawer to give superb user feedback
    setTimeout(() => {
      setIsCartOpen(true);
    }, 400);
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleTriggerCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    // Clear cart upon successful order
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0);

  const scrollToCustomizer = () => {
    const customizer = document.getElementById("customizer");
    if (customizer) {
      customizer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col bg-[#030303]">
      {/* 1. Header Navigation */}
      <Navbar onCartOpen={() => setIsCartOpen(true)} cartItemsCount={totalCartCount} />

      {/* 2. Hero 100vh Entrance and Parallax Section */}
      <HeroSection onPreOrder={scrollToCustomizer} />

      {/* 3. Tech Feature Grid Section */}
      <FeatureShowcase />

      {/* 4. Bespoke Accessory Customizer Section */}
      <TreadmillCustomizer onAddToCart={handleAddToCart} />

      {/* 5. Detail Technical Attributes Comparison Sheet */}
      <TechSpecs />

      {/* 6. High-end Brand Footer */}
      <Footer />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleTriggerCheckout}
      />

      {/* Mock Credit-card Checkout Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        totalAmount={totalAmount}
        onOrderSuccess={handleOrderSuccess}
      />
    </main>
  );
}
