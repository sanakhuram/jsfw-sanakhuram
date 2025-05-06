'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const router = useRouter();
  const total = cart.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/success');
  };

  return (
    <main className="flex justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-gray-100 dark:bg-black p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
          {cart.length === 0 ? (
            <p className="text-center text-red-900">Your cart is empty</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded shadow"
                >
                  <div className="relative w-20 h-20 rounded-md overflow-hidden">
                    <Image
                      src={item.image.url}
                      alt={item.image.alt}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <label className="text-sm">Qty:</label>
                      <div className="flex items-center border border-orange-900 rounded overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="px-2 bg-red-900 text-orange-200 hover:bg-red-700"
                        >
                          −
                        </button>
                        <span className="w-10 text-center bg-white text-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, Math.min(99, item.quantity + 1))
                          }
                          className="px-2 bg-red-900 text-orange-200 hover:bg-red-700"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">
                      Price: ${(item.discountedPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-800 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-orange-50 dark:bg-gray-800 p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <p className="text-lg mb-2">Items: {cart.length}</p>
          <p className="text-lg mb-4">
            Total: <strong>${total.toFixed(2)}</strong>
          </p>

          <h3 className="text-lg font-semibold mb-2">Customer Info</h3>
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 rounded border border-orange-300 dark:bg-black dark:text-white"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded border border-orange-300 dark:bg-black dark:text-white"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-2 rounded border border-orange-300 dark:bg-black dark:text-white"
              required
            />
            <textarea
              placeholder="Shipping Address"
              className="w-full p-2 rounded border border-orange-300 dark:bg-black dark:text-white"
              rows={3}
              required
            />
            <select
              className="w-full p-2 rounded border border-orange-300 dark:bg-black dark:text-white"
              required
            >
              <option value="">Select Payment Method</option>
              <option>Credit Card</option>
              <option>PayPal</option>
              <option>Bank Transfer</option>
            </select>

            <button
              type="submit"
              className="w-full bg-red-900 text-orange-200 py-3 rounded-lg font-bold hover:bg-red-700"
            >
              Proceed to Checkout
            </button>
          </form>

          <button
            onClick={clearCart}
            className="w-full mt-3 bg-red-400 text-white py-2 rounded-lg font-bold hover:bg-red-600"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </main>
  );
}
