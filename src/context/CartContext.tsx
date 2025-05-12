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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (err) {
      console.error('Failed to parse cart from storage', err);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, mounted]);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      return exists
        ? prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...prev, { ...product, quantity: 1 }];
    });

    toast.success(`${product.title} added to cart`, {
      id: `add-${product.id}`,
    });
  }, []);

  const removeFromCart = useCallback(
    (id: string) => {
      const item = cart.find((item) => item.id === id);

      setCart((prev) => prev.filter((item) => item.id !== id));

      if (item) {
        toast.success(`${item.title} removed from cart`, {
          id: `remove-${id}`,
        });
      }
    },
    [cart],
  );

  const clearCart = useCallback(() => {
    setCart([]);
    toast.success('Cart cleared', { id: 'clear-cart' });
  }, []);

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity < 1) return;

      const item = cart.find((item) => item.id === id);

      setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));

      if (item) {
        toast.success(`${item.title} quantity updated to ${quantity}`, {
          id: `qty-${id}`,
        });
      }
    },
    [cart],
  );

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
