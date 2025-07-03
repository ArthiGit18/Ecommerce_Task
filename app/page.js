'use client'
import products from '../data/products.json';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(stored);
  }, []);

  const updateLocalCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    let updated;
    if (existing) {
      updated = cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      updated = [...cart, { ...product, qty: 1 }];
    }
    updateLocalCart(updated);
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateLocalCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);
    updateLocalCart(updated);
  };

  const getQty = (id) => {
    const item = cart.find((item) => item.id === id);
    return item ? item.qty : 0;
  };

  return (
    <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => {
        const qty = getQty(product.id);
        return (
          <div key={product.id} className="border p-4 rounded">
            <img
              src={product.image}
              className="h-40 object-contain mb-2 mx-auto"
              alt={product.title}
            />
            <h2 className="font-semibold">{product.title}</h2>
            <p className="font-bold">${product.price}</p>
            <div className="mt-2 flex items-center gap-3">
              {qty === 0 ? (
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center gap-2 border rounded px-2 py-1">
                  <button
                    onClick={() => decreaseQty(product.id)}
                    className="text-xl px-2"
                  >
                    −
                  </button>
                  <span>{qty}</span>
                  <button
                    onClick={() => increaseQty(product.id)}
                    className="text-xl px-2"
                  >
                    +
                  </button>
                </div>
              )}
              <Link
                href={`/products/${product.id}`}
                className="text-blue-700 underline ml-auto"
              >
                View
              </Link>
            </div>
          </div>
        );
      })}
    </main >
  );
}