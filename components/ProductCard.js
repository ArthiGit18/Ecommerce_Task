'use client'
import { useState } from 'react'

export default function ProductCard() {
  const products = [
    {
      id: 1,
      title: 'iPhone 14',
      price: 799,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      title: 'Samsung Galaxy S23',
      price: 699,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      title: 'Google Pixel 7',
      price: 599,
      image: 'https://via.placeholder.com/150',
    },
  ]

  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) return prev
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId, change) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const getCartItem = (id) => cart.find((item) => item.id === id)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
      {products.map((product) => {
        const cartItem = getCartItem(product.id)

        return (
          <div
            key={product.id}
            className="border rounded p-4 flex flex-col shadow"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 object-contain mb-2"
            />
            <h2 className="font-semibold">{product.title}</h2>
            <p className="mb-2">${product.price}</p>

            {cartItem ? (
              <div className="mt-auto flex items-center justify-between gap-2 border rounded px-2 py-1 bg-gray-100">
                <button
                  onClick={() => updateQuantity(product.id, -1)}
                  className="px-2 text-black"
                >
                  -
                </button>
                <span className='text-black'>{cartItem.quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, 1)}
                  className="px-2 text-black"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="mt-auto bg-blue-600 text-white rounded px-3 py-1 mt-2"
              >
                Add to Cart
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
