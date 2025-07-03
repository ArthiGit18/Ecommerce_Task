import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center p-4 shadow-md bg-white sticky top-0 z-10">
            <Link href="/" className="text-xl font-bold text-black">E-Store</Link>
            <ul className="flex gap-4 text-black">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/cart">Cart 🛒</Link></li>
            </ul>
        </nav>
    )
}