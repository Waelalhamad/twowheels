import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Product } from "@/lib/types";

interface WishlistContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  toggleItem: (product: Product) => void;
  isWishlisted: (productId: number) => boolean;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem("twowheels-wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("twowheels-wishlist", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => setItems((cur) => cur.find((p) => p.id === product.id) ? cur : [...cur, product]);
  const removeItem = (productId: number) => setItems((cur) => cur.filter((p) => p.id !== productId));
  const toggleItem = (product: Product) => setItems((cur) => cur.find((p) => p.id === product.id) ? cur.filter((p) => p.id !== product.id) : [...cur, product]);
  const isWishlisted = (productId: number) => items.some((p) => p.id === productId);

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, toggleItem, isWishlisted, totalItems: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
