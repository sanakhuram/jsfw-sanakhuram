'use client';

import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';

export default function Header() {
  const { cart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-red-900 p-4 mb-6 text-orange-300">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold flex items-center space-x-2">
          <Image src="/images/logo.png" alt="Vibe Cart Logo" width={40} height={40} />
          <span>Vibe Cart</span>
        </Link>

        <nav className="flex items-center space-x-4">
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/cart" className="relative">
            <FaShoppingCart size={24} aria-label="Cart" />
            {mounted && totalItems > 0 && (
              <span className="bg-orange-500 text-red-900 text-xs px-2 py-1 rounded-full absolute -top-2 -right-3">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
