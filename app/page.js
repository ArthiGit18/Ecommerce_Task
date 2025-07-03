'use client';

import products from '../data/products.json';
import Link from 'next/link';

export default function HomePage() {
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
      exists.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Item added to cart");
  };

  return (
    <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map(product => (
        <div key={product.id} className="border p-4 rounded">
          <img src={product.image} className="h-40 object-contain mb-2 mx-auto" />
          <h2 className="font-semibold">{product.title}</h2>
          <p>${product.price}</p>
          <div className="mt-2">
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
            >
              Add to Cart
            </button>
            <Link href={`/product/${product.id}`} className="text-blue-700 underline">
              View
            </Link>
          </div>
        </div>
      ))}
    </main>
  );
}
