// app/layout.tsx

import '../styles/globals.css';
import { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import { Kodchasan } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import { FavouritesProvider } from '@/context/FavouritesContext';
import BackToTopButton from '@/components/BackToTopButton';

export const metadata = {
  icons: {
    icon: '/favicon.ico',
  },
};

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
        <FavouritesProvider>
          <Header />
          <Toaster position="top-center" />
          <main className="flex-grow">{children}</main>
          <Footer />
          <BackToTopButton/>
          </FavouritesProvider>
        </CartProvider>  
      </body>
    </html>
  );
}
