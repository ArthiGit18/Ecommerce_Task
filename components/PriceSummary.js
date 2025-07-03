'use client'

export default function PriceSummary({ totalItems, totalPrice, onClear }) {
  return (
    <div className="bg-gray-100 p-4 rounded shadow-md h-fit sticky top-4">
      <h2 className="text-xl font-semibold mb-2 text-black">Price Summary</h2>
      <p className="text-black">Total Items: <strong>{totalItems}</strong></p>
      <p className="my-2 text-black">Subtotal: <strong>${totalPrice.toFixed(2)}</strong></p>
      <hr className="my-2" />
      <p className="text-lg font-bold text-black">Total: ${totalPrice.toFixed(2)}</p>
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Proceed to Checkout
      </button>
      <button
        onClick={onClear}
        className="mt-2 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Clear Cart
      </button>
    </div>
  )
}
