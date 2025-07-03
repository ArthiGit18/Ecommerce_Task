'use client';

import { useParams } from 'next/navigation';
import products from '../../../data/products.json';

export default function ProductDetail() {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const exists = cart.find(item => item.id === product.id);
        if (exists) {
            exists.qty += 1;
        } else {
            cart.push({ ...product, qty: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert("Added to cart");
    };

    if (!product) return <div className="p-6">Product not found</div>;

    return (
        <div className="p-6 flex flex-col md:flex-row">
            <img src={product.image} className="w-1/2 object-contain" />
            <div className="md:ml-6">
                <h1 className="text-xl font-bold">{product.title}</h1>
                <p className="my-2">{product.description}</p>
                <p className="font-bold text-lg">${product.price}</p>
                <button onClick={addToCart} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
