// app/layout.tsx

import '../styles/globals.css';
import { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import { Kodchasan } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';

const kodchasan = Kodchasan({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={kodchasan.variable}>
      <body className="flex flex-col min-h-screen font-sans">
        <CartProvider>
        <Header />
        <Toaster position="top-right" />
        <main className="flex-grow">{children}</main>
        <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
