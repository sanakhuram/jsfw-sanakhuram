'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';
import { FiCheckCircle, FiShoppingCart, FiMail } from 'react-icons/fi';
import Link from 'next/link';

export default function SuccessPage() {
  const router = useRouter();
  const { clearCart } = useCart();

  useEffect(() => {
    const hasShown = sessionStorage.getItem('hasShownSuccessToast');

    if (!hasShown) {
      clearCart();
      toast.success('🎉 Purchase complete! Thank you for shopping with us.');
      sessionStorage.setItem('hasShownSuccessToast', 'true');
    }

    return () => {
      sessionStorage.removeItem('hasShownSuccessToast');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center justify-center m-10">
      <div className="bg-gray-100 dark:bg-black dark:shadow-gray-600 p-8 rounded-lg shadow-md text-center max-w-md mx-auto space-y-6">
        <FiCheckCircle className="text-red-600 mx-auto" size={48} />
        <h1 className="text-3xl font-bold">Order Confirmed</h1>
        <p>Your order has been placed successfully and is now being processed.</p>

        <div className="text-sm text-gray-700 bg-orange-50 p-4 rounded-md shadow-inner">
          <p className="mb-2">
            We will send you a confirmation email with tracking details as soon as your order ships.
          </p>
          <p className="text-sm text-gray-600">
            If you have any questions or concerns, our support team is here to help.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.push('/')}
            className="bg-red-900 text-orange-100 px-6 py-3 rounded-xl hover:bg-red-700 transition inline-flex items-center justify-center gap-2"
          >
            <FiShoppingCart size={20} />
            Continue Shopping
          </button>

          <Link
            href="/contact"
            className="text-sm text-red-800 hover:underline inline-flex items-center justify-center gap-1"
          >
            <FiMail size={16} />
            Need help? Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
