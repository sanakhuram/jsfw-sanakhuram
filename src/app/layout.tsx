import '../styles/globals.css';
import { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '@/components/Footer';

import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
          <Header />
          <Toaster position="top-right" />
          <main className="flex-grow">
            {children}
          </main>  
          <Footer/>            
      </body>
    </html>
  );
}
