'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';

export default function ProductCard({
  id,
  title,
  price,
  discountedPrice,
  image,
  description,
  rating,
}: Product) {
  const discountPercent = Math.round(((price - discountedPrice) / price) * 100);

  const renderStars = (count: number) => {
    return '⭐'.repeat(Math.round(count));
  };

  return (
    <div className="bg-gray-200 rounded-xl shadow p-4 relative">
      {discountedPrice < price && (
        <div className="absolute top-3 right-3 bg-red-700 text-white text-xs font-bold uppercase px-2 py-1 rounded-md z-40">
          {discountPercent}% off
        </div>
      )}

      <Link
        href={`/product/${id}`}
        className="relative block w-full h-48 rounded-md mb-4 overflow-hidden"
      >
        <Image
          src={image.url}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-200 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
          loading="eager"
        />
      </Link>

      <h2 className="text-lg font-semibold mb-1">{title}</h2>

      <p className="text-sm text-gray-700 mb-2 line-clamp-3">{description}</p>

      <p className="text-yellow-600 mb-2 text-sm">
        {renderStars(rating)} ({rating})
      </p>

      <p className="mb-2">
        {discountedPrice < price ? (
          <>
            <span className="line-through text-gray-800 mr-2">${price.toFixed(2)}</span>
            <span className="text-green-600 font-bold">${discountedPrice.toFixed(2)}</span>
          </>
        ) : (
          <span className="font-bold">${price.toFixed(2)}</span>
        )}
      </p>
    </div>
  );
}
