'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { FaEye, FaShoppingBag, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { useFavourites } from '@/context/FavouritesContext';

export default function ProductCard(product: Product) {
  const { id, title, price, discountedPrice, image, description, rating } = product;

  const discountPercent = Math.round(((price - discountedPrice) / price) * 100);
  const { addToCart } = useCart();
  const { toggleFavourite, isFavourite } = useFavourites();
  const fav = isFavourite(id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const renderStars = (count: number) => '⭐'.repeat(Math.round(count));

  return (
    <div className="bg-gray-200 rounded-xl shadow-md shadow-gray-300 p-4 relative group flex flex-col h-full dark:shadow-red-900">
      {discountedPrice < price && (
        <div className="absolute top-3 right-3 bg-red-700 text-white text-xs font-bold uppercase px-2 py-1 rounded-md z-40">
          {discountPercent}% off
        </div>
      )}

      <Link
        href={`/product/${id}`}
        className="relative w-full aspect-square rounded-md mb-4 overflow-hidden"
      >
        <Image
          src={image.url}
          alt={image.alt || 'Product image'}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
          loading="eager"
        />
      </Link>

      <div className="flex-grow">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-1 truncate">{title}</h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-2 line-clamp-3 truncate">
          {description}
        </p>
        <p className="text-xs sm:text-sm md:text-base text-yellow-600 mb-2">
          {renderStars(rating)} ({rating})
        </p>
        <p className="mb-2 text-xs sm:text-sm md:text-base flex flex-wrap items-baseline gap-x-1 break-words">
          {discountedPrice < price ? (
            <>
              <span className="line-through text-gray-800 text-[10px] sm:text-xs md:text-sm">
                ${price.toFixed(2)}
              </span>
              <span className="text-green-600 font-bold text-sm sm:text-base md:text-lg">
                ${discountedPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-bold text-sm sm:text-base md:text-lg">${price.toFixed(2)}</span>
          )}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-4 mt-3 items-center justify-center">
        <Link
          href={`/product/${id}`}
          className="p-1 sm:p-2 rounded-full bg-red-900 shadow hover:bg-red-700 hover:scale-110 transition-transform"
          aria-label="View product"
        >
          <FaEye className="text-orange-200 w-4 h-4 sm:w-5 sm:h-5" />
        </Link>

        <button
          onClick={handleAddToCart}
          className="p-1 sm:p-2 rounded-full bg-red-900 text-orange-200 shadow hover:bg-red-700 hover:scale-110 transition-transform"
          aria-label="Add to cart"
        >
          <FaShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={() => toggleFavourite(product)}
          className={`p-1 sm:p-2 rounded-full shadow transition-transform hover:scale-110 ${
            fav ? 'bg-red-500 text-white' : 'bg-red-900 text-orange-200 hover:bg-red-600'
          }`}
          aria-label="Add to favourites"
        >
          {fav ? (
            <FaHeart className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <FaRegHeart className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
