'use client'

import Link from 'next/link'
import { useEffect, useState, Suspense } from 'react'
import SearchBar from './Searchbar'

export default function Navbar() {
  const [count, setCount] = useState(0)

  const updateCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const total = cart.reduce((sum, item) => sum + item.qty, 0)
    setCount(total)
  }

  useEffect(() => {
    updateCount()
    const handler = () => updateCount()
    window.addEventListener('cartUpdated', handler)
    return () => window.removeEventListener('cartUpdated', handler)
  }, [])

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 shadow-md bg-gray-800 sticky top-0 z-10 text-white">
     
      <Link href="/" className="text-xl font-bold text-white">🛍️ E-Store</Link>
      <ul className="flex gap-4">
        <li><Link href="/">Home</Link></li>
        <li className="relative">
          <Link href="/cart" className="relative inline-block">
            Cart🛒
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
                {count}
              </span>
            )}
          </Link>
        </li>
      </ul>

      <Suspense fallback={null}>
        <SearchBar />
      </Suspense>
    </nav>
  )
}
