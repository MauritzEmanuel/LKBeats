'use client'
import { Beat } from '@/types/beat';
import { createContext, useContext, useState, ReactNode } from 'react';

type CartContextType = {
  cartItems: Beat[];
  addToCart: (beat: Beat) => void;
  removeFromCart: (beatId: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Beat[]>([]);

  const addToCart = (beat: Beat) => {
    setCartItems(prev => [...prev, beat]);
  };

  const removeFromCart = (beatId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== beatId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 