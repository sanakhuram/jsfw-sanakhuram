'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Product } from '@/types/product';
import toast from 'react-hot-toast';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside a CartProvider');
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (err) {
        console.error('Failed to parse cart from storage', err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      const updatedCart = exists
        ? prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prev, { ...product, quantity: 1 }];

      return updatedCart;
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => {
      const item = prev.find((item) => item.id === id);
      if (item) {
        toast.success(`${item.title} removed from cart`);
      }
      return prev.filter((item) => item.id !== id);
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    toast.success('Cart cleared');
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
  
    setCart((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, quantity } : item));
      const item = prev.find((item) => item.id === id);
  
      if (item) {
        setTimeout(() => {
          toast.success(`${item.title} quantity updated to ${quantity}`);
        }, 0); 
      }
      return updated;
    });
  }, []);
  

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
