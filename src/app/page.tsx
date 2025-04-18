'use client';

import ProductCard from "@/components/ProductCard";
import React, { useState, useEffect } from "react";
import { Product } from "@/types/product";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://v2.api.noroff.dev/online-shop');
        const data = await res.json();
        setProducts(data.data); 
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }
    fetchProducts();
  }, []);

  const discountedCount = products.filter(p => p.discountedPrice < p.price).length;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {discountedCount > 0 && (
        <div className="bg-orange-300 text-cyan-900 px-6 py-3 rounded-lg text-center font-semibold shadow-inner">
          🔖 Only {discountedCount} {discountedCount === 1 ? 'item is' : 'items are'} on sale right now!
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <p className="text-center text-neutral-500">No products found.</p>
        )}
      </div>
    </main>
  );
}
