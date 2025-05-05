'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroIntro from '@/components/HeroIntro';
import SortSearchBar from '@/components/SortSearchBar';
import ProductGrid from '@/components/ProductGrid';
import { useProductFilter } from './hooks/useProductFilter';
import { Product } from '@/types/product';
import { getAllProducts } from '@/lib/api';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showShop, setShowShop] = useState(false);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'title'>('price');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const perPage = 12;

  useEffect(() => {
    const darkMatch = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkMatch.matches);
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    darkMatch.addEventListener('change', handler);
    return () => darkMatch.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowShop(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const { paginated, totalPages } = useProductFilter(products, {
    search,
    sortBy,
    sortDir,
    currentPage,
    perPage,
  });

  const discountedCount = products.filter((p) => p.discountedPrice < p.price).length;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {!showShop ? (
        <HeroIntro isDark={isDarkMode} />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {discountedCount > 0 && (
            <div className="bg-orange-300 text-gray-700 px-6 py-3 rounded-lg text-center font-semibold shadow-inner mb-4">
              🔖 {discountedCount} items on sale right now!
            </div>
          )}
          <SortSearchBar
            search={search}
            onSearchChange={setSearch}
            sortBy={sortBy}
            sortDir={sortDir}
            setSortBy={setSortBy}
            setSortDir={setSortDir}
          />
          <ProductGrid
            products={paginated}
            totalPages={totalPages}
            currentPage={currentPage}
            setPage={setCurrentPage}
          />
        </motion.div>
      )}
    </main>
  );
}
