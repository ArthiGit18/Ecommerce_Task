'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function SearchBar() {
  const [search, setSearch] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Set input on first load from URL
  useEffect(() => {
    const currentSearch = searchParams.get('search') || ''
    setSearch(currentSearch)
  }, [searchParams])

  // Update URL on every input
  const handleChange = (e) => {
    const value = e.target.value
    setSearch(value)

    const newParams = new URLSearchParams(searchParams.toString())
    if (value.trim()) {
      newParams.set('search', value)
    } else {
      newParams.delete('search')
    }
    router.push(`${pathname}?${newParams.toString()}`)
  }

  // Clear input and remove from URL
  const handleClear = () => {
    setSearch('')
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.delete('search')
    router.push(`${pathname}?${newParams.toString()}`)
  }

  return (
    <div className="relative w-64">
      <input
        type="text"
        placeholder="Search products..."
        className="px-3 py-1 pr-8 rounded text-white w-full border-2"
        value={search}
        onChange={handleChange}
      />
      {search && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black text-sm"
        >
          ❌
        </button>
      )}
    </div>
  )
}
