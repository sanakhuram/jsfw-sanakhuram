'use client';

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
    const router = useRouter();
    const total = cart.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0);

    const handleCheckout = () => router.push('/success');

    return (
        <main>
            <div>
                <h1>Your Cart</h1>
                {cart.length === 0 ? (
                    <p>Your Cart is empty</p>
                ) : (
                    <ul>
                        {cart.map(item => (
                            <li key={item.id}>
                                <div style={{ position: 'relative', width: '150px', height: '150px' }}>
                                    <Image
                                        src={item.image.url}
                                        alt={item.image.alt}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div>
                                    <h2>{item.title}</h2>
                                    <label>Qty:</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={e => updateQuantity(item.id, Number(e.target.value))}
                                    />
                                </div>

                                <div>
                                    <p>Price: ${(item.discountedPrice * item.quantity).toFixed(2)}</p>
                                </div>

                                <button onClick={() => removeFromCart(item.id)}>
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {cart.length > 0 && (
                    <div>
                        <p>Total: ${total.toFixed(2)}</p>
                        <button onClick={clearCart}>Clear Cart</button>
                        <button onClick={handleCheckout}>Checkout</button>
                    </div>
                )}
            </div>
        </main>
    );
}
