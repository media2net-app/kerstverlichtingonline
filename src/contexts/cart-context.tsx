"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ScrapedProduct } from "@/lib/amazon";

export type CartItem = {
  product: ScrapedProduct;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: ScrapedProduct, quantity?: number) => void;
  removeFromCart: (asin: string) => void;
  updateQuantity: (asin: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        // Invalid JSON, ignore
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: ScrapedProduct, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.asin === product.asin);
      if (existing) {
        return prev.map((item) =>
          item.product.asin === product.asin
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (asin: string) => {
    setItems((prev) => prev.filter((item) => item.product.asin !== asin));
  };

  const updateQuantity = (asin: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(asin);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.asin === asin ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((sum, item) => {
      const price = parseFloat(
        item.product.price?.replace(/[^\d,]/g, "").replace(",", ".") || "0"
      );
      return sum + price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

