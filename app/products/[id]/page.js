'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import products from '../../../data/products.json';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const p = products.find(item => item.id === parseInt(id));
    setProduct(p);
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);
    let updated;
    if (existing) {
      updated = cart.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      updated = [...cart, { ...product, qty: 1 }];
    }
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  if (!product) return <div className="p-6">Loading product...</div>;

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      <img src={product.image} className="w-1/2 object-contain" alt={product.title} />
      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-700 my-2">{product.description}</p>
        <p className="text-lg font-semibold">${product.price}</p>
        <button
          onClick={addToCart}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
