"use client";
import Link from 'next/link'

export default function ProductCard({ product, addToCart, cart, updateQuantity }) {
  const cartItem = Array.isArray(cart) ? cart.find(item => item.id === product.id) : null;


  return (
    <div className="border rounded p-4 flex flex-col">
      <Link href={`/product/${product.id}`}>
        <img src={product.image} className="h-40 object-contain mb-2" alt={product.title} />
        <h2 className="font-semibold">{product.title}</h2>
        <p>${product.price}</p>
      </Link>

      {cartItem ? (
        <div className="mt-auto flex items-center justify-between gap-2 border rounded px-2 py-1 bg-gray-100">
          <button onClick={() => updateQuantity(product.id, -1)} className="px-2 text-black">-</button>
          <span className='text-black'>{cartItem.quantity}</span>
          <button onClick={() => updateQuantity(product.id, 1)} className="px-2 text-black">+</button>
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
}
