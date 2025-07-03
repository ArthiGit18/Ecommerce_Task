'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    setCount(total);
  };

  useEffect(() => {
    updateCount();

    const handler = () => updateCount();
    window.addEventListener('cartUpdated', handler);

    return () => {
      window.removeEventListener('cartUpdated', handler);
    };
  }, []);

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <Link href="/" className="font-bold">🛍️ MyShop</Link>
      <Link href="/cart">🛒 Cart ({count})</Link>
    </nav>
  );
}
