'use client';

import { useFavourites } from '@/context/FavouritesContext';
import ProductCard from '@/components/ProductCard';

export default function FavouritesPage() {
  const { favourites } = useFavourites();

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Favourites ❤️</h1>

      {favourites.length === 0 ? (
        <p className="text-gray-500 text-center">You have not added any favourites yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favourites.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </main>
  );
}
