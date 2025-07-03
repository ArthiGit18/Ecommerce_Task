'use client';

import PriceSummary from '@/components/PriceSummary';
import { useEffect, useState } from 'react';

export default function CartPage() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const updateQty = (id, change) => {
        const newCart = cart
            .map(item =>
                item.id === id ? { ...item, qty: item.qty + change } : item
            )
            .filter(item => item.qty > 0);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const removeItem = (id) => {
        const newCart = cart.filter(item => item.id !== id);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

    return (
        <div className="p-6 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                {cart.length === 0 ? (
                    <p>No items in cart.</p>
                ) : (
                    cart.map(item => (
                        <div key={item.id} className="flex items-center mb-4 border-b pb-4">
                            <img src={item.image} className="w-24 h-24 object-contain" alt={item.title} />
                            <div className="ml-4 flex-1">
                                <h2 className="font-semibold">{item.title}</h2>
                                <p>${item.price} × {item.qty} = <strong>${(item.price * item.qty).toFixed(2)}</strong></p>
                                <div className="flex items-center mt-2">
                                    <button
                                        onClick={() => updateQty(item.id, -1)}
                                        className="px-2 bg-gray-200 text-black"
                                        disabled={item.qty <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="px-4">{item.qty}</span>
                                    <button
                                        onClick={() => updateQty(item.id, 1)}
                                        className="px-2 bg-gray-200 text-black"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="ml-4 text-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <PriceSummary
                totalItems={totalItems}
                totalPrice={totalPrice}
                onClear={clearCart}
            />
        </div>
    );
}
