'use client';

import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart`);
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
