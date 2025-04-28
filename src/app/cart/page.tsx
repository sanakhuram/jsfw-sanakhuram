'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const router = useRouter();
  const total = cart.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0);

  const handleCheckout = () => router.push('/success');

  return (
    <main className="flex items-center justify-center">
      <div className="w-full max-w-xl bg-gray-100 rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Your Cart</h1>
        {cart.length === 0 ? (
          <p className="text-center text-red-900">Your Cart is empty</p>
        ) : (
          <ul className="space-y-6">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow-inner">
                <div className="relative w-20 h-20 rounded-md overflow-hidden mr-4">
                  <Image
                    src={item.image.url}
                    alt={item.image.alt}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <div className="mt-2 flex items-center space-x-2">
                    <label className="text-sm">Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                      className="w-16 p-1 border border-orange-900 rounded"
                    />
                  </div>
                  <p className="mt-2">
                    Price: ${(item.discountedPrice * item.quantity).toFixed(2)}
                  </p>
                </div>

                <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-800">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-3xl font-semibold">Total: ${total.toFixed(2)}</p>
            <div className="mt-6 flex justify-center gap-6">
              <button
                onClick={clearCart}
                className="bg-red-400 text-orange-200 px-6 py-2 rounded-lg font-bold hover:bg-red-700"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="bg-red-900 text-orange-200 px-6 py-2 rounded-lg font-bold hover:bg-red-400"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
