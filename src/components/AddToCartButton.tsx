'use client';

import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-4 bg-red-900 text-orange-200 px-4 py-2 rounded hover:bg-red-700"
    >
      Add to Cart
    </button>
  );
}
