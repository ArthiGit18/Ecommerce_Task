'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import products from '../../../data/products.json';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(0);

  useEffect(() => {
    const p = products.find(item => item.id === parseInt(id));
    setProduct(p);

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const inCart = cart.find(item => item.id === parseInt(id));
    setQty(inCart?.qty || 0);
  }, [id]);

  const updateCart = (newQty) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);

    let updatedCart;
    if (existing) {
      if (newQty <= 0) {
        updatedCart = cart.filter(item => item.id !== product.id);
      } else {
        updatedCart = cart.map(item =>
          item.id === product.id ? { ...item, qty: newQty } : item
        );
      }
    } else {
      updatedCart = [...cart, { ...product, qty: newQty }];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated')); 
    setQty(newQty);
  };

  if (!product) return <div className="p-6">Loading product...</div>;

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      <img src={product.image} className="w-1/2 object-contain" alt={product.title} />
      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-700 my-2">{product.description}</p>
        <p className="text-lg font-semibold">${product.price}</p>

        {qty === 0 ? (
          <button
            onClick={() => updateCart(1)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>
        ) : (
          <div className="mt-4 flex items-center gap-2 border px-4 py-2 rounded w-fit">
            <button onClick={() => updateCart(qty - 1)} className="text-xl px-2">−</button>
            <span>{qty}</span>
            <button onClick={() => updateCart(qty + 1)} className="text-xl px-2">+</button>
          </div>
        )}
      </div>
    </div>
  );
}
