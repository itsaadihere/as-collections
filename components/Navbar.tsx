"use client";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function Navbar() {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="w-full flex flex-col z-50 sticky top-0 bg-white shadow-sm">
      {/* Top Banner */}
      <div className="bg-[#df8a73] text-white text-[10px] font-semibold py-2 text-center tracking-widest uppercase">
        Free shipping on orders over Rs. 5,000
      </div>

      {/* Main Navbar */}
      <nav className="relative bg-white/95 backdrop-blur-sm px-8 h-24 flex items-center justify-between">
        
        {/* Left Links */}
        <div className="hidden md:flex items-center gap-8 text-[12px] font-bold text-[#4a4238] uppercase tracking-widest">
          <Link href="/shop" className="hover:text-[#a68e7b] transition-colors">Shop All</Link>
          <Link href="/new-arrivals" className="hover:text-[#a68e7b] transition-colors">New Arrivals</Link>
          <Link href="/shop?category=boys" className="hover:text-[#a68e7b] transition-colors">Boys</Link>
          <Link href="/shop?category=girls" className="hover:text-[#a68e7b] transition-colors">Girls</Link>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/">
            <img 
              src="/logo.png" 
              alt="AS Collection Logo" 
              className="h-16 w-auto object-contain mix-blend-multiply"
            />
          </Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6 text-[#4a4238]">
          <button className="hover:text-[#a68e7b] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>

          <Link href="/checkout" className="relative hover:text-[#a68e7b] transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#a68e7b] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

      </nav>
    </div>
  );
}
