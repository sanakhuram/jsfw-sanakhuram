'use client';

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";
import { FiCheckCircle, FiShoppingCart } from 'react-icons/fi';

export default function SuccessPage() {
    const router = useRouter();
    const { clearCart } = useCart();

    useEffect(() => {
        const hasShown = sessionStorage.getItem("hasShownSuccessToast");

        if (!hasShown) {
            clearCart();
            toast.success('🎉 Purchase complete! Thank you for shopping with us.');
            sessionStorage.setItem("hasShownSuccessToast", "true");
        }

        return () => {
            sessionStorage.removeItem("hasShownSuccessToast");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className=" flex items-center justify-center m-10">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md mx-auto">
                <FiCheckCircle className="text-red-600 mx-auto mb-4" size={48} />
                <h1 className="text-3xl font-bold mb-4">
                    Order Confimed
                </h1>
                <p className="mb-6">
                    Your order has been placed successfully and is ready to be shipped.
                </p>
                <button
                    onClick={() => router.push('/')}
                    className="bg-red-900 text-orange-100 px-6 py-3 rounded-xl hover:bg-red-700 transition inline-flex items-center mx-auto gap-2"
                >
                    <FiShoppingCart size={20} />
                    Continue Shopping
                </button>

            </div>
        </div>
    );
}