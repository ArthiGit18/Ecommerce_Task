"use client"
import Link from 'next/link'

export default function ProductCard({ product, addToCart, cart, updateQuantity }) {
  const cartItem = Array.isArray(cart) ? cart.find(item => item.id === product.id) : null;

  return (
    <div className="border rounded p-4 flex flex-col">
      <img src={product.image} className="h-40 object-contain mb-2" alt={product.title} />
      <h2 className="font-semibold mb-2">{product.title}</h2>
      <p className="mb-2">${product.price}</p>

      <div className="flex gap-2 mt-auto">
        <Link href={`/product/${product.id}`} className="bg-gray-200 text-black rounded px-3 py-1">View</Link>

        {cartItem ? (
          <div className="flex items-center gap-2 border rounded px-2 py-1 bg-gray-100">
            <button onClick={() => updateQuantity(product.id, -1)} className="px-2">-</button>
            <span>{cartItem.quantity}</span>
            <button onClick={() => updateQuantity(product.id, 1)} className="px-2">+</button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white rounded px-3 py-1"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  )
}
