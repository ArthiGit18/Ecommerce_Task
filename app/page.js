import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'
import products from '@/data/products.json'

export default function Home({ cart, addToCart, updateQuantity }) {
  return (
    <>
      <Navbar />
      <main className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            cart={cart}
            updateQuantity={updateQuantity}
          />
        ))}
      </main>
    </>
  )
}