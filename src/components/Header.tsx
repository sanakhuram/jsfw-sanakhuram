'use client';

import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="bg-red-900 p-4 mb-6 text-orange-300">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                
                <Link href="/" className="text-xl font-bold flex items-center space-x-2">
                    <Image
                        src="/images/logo.png"  
                        alt="Vibe Cart Logo"
                        width={40}
                        height={35}
                    />
                    <span>Vibe Cart</span>
                </Link>

                <nav className="flex items-center space-x-4">
                    <Link href="/contact" className="hover:underline">
                        Contact
                    </Link>
                    <Link href="/cart" className="relative">
                        <FaShoppingCart size={24} aria-label="Cart" />
                    </Link>
                </nav>
            </div>
        </header>
    );
}
