'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Footer() {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            toast.error('Please enter a valid email address.');
            return;
        }

        toast.success('Subscribed successfully!');
        setEmail('');
    };

    return (
        <footer className="bg-red-900 text-orange-300 py-10 relative">
            <Toaster position="top-center" />

            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="space-y-3 text-center md:text-left">
                    <Link href="/" className="text-xl font-bold flex justify-center md:justify-start items-center space-x-2">
                        <Image
                            src="/images/logo.png"
                            alt="Vibe Cart Logo"
                            width={80}
                            height={35}
                        />
                    </Link>
                    <p className="text-sm text-orange-200">
                        Your go-to destination for stylish and affordable shopping.
                    </p>
                </div>

                <div className="flex flex-col items-center space-y-4">
                    <div className="flex space-x-4">
                        <Link href="https://github.com/yourusername" target="_blank" rel="noopener" className="hover:opacity-75">
                            <FaGithub size={20} />
                        </Link>
                        <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener" className="hover:opacity-75">
                            <FaLinkedin size={20} />
                        </Link>
                        <Link href="https://instagram.com/yourusername" target="_blank" rel="noopener" className="hover:opacity-75">
                            <FaInstagram size={20} />
                        </Link>
                    </div>

                    <p className="text-sm text-center text-orange-200 max-w-xs">
                        At Vibe Cart, we blend trend with trust. Discover quality products at unbeatable prices, delivered with care.
                    </p>

                    <form onSubmit={handleSubscribe} className="w-full max-w-xs">
                        <div className="flex items-center border-b border-orange-300 py-2">
                            <input
                                className="appearance-none bg-transparent border-none w-full text-orange-100 mr-3 py-1 px-2 leading-tight focus:outline-none placeholder-orange-300"
                                type="email"
                                placeholder="Your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-label="Subscribe"
                            />
                            <button
                                className="flex-shrink-0 bg-orange-300 hover:bg-orange-400 text-red-900 py-1 px-3 rounded"
                                type="submit"
                            >
                                Subscribe
                            </button>
                        </div>
                    </form>

                    <p className="text-xs text-orange-200 text-center">
                        &copy; {new Date().getFullYear()} Vibe Cart. All rights reserved.
                    </p>
                </div>

                <div className="space-y-3 text-center md:text-right">
                    <nav className="flex flex-col space-y-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <Link href="/contact" className="hover:underline">Contact</Link>
                        <Link href="/cart" className="hover:underline">Cart</Link>
                        <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                        <Link href="/terms-of-service" className="hover:underline">Terms of Service</Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
