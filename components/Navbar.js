'use client';

import Link from 'next/link'
import { useEffect, useState } from 'react';


export default function Navbar() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const total = storedCart.reduce((sum, item) => sum + item.qty, 0);
        setCount(total);
    });
    return (
        <nav className="flex justify-between items-center p-4 shadow-md bg-white sticky top-0 z-10">
            <Link href="/" className="text-xl font-bold text-black">E-Store</Link>
            <ul className="flex gap-4 text-black">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/cart">Cart 🛒 ({count})</Link></li>
            </ul>
        </nav>
    )
}