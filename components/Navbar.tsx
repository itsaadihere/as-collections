"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function Navbar() {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <div className="w-full flex flex-col z-50 sticky top-0 bg-white shadow-sm">
      {/* Top Banner */}
      <div className="bg-[#df8a73] text-white text-[10px] font-semibold py-2 text-center tracking-widest uppercase">
        Free shipping on orders over Rs. 5,000
      </div>

      {/* Main Navbar */}
      <nav className="relative bg-white/95 backdrop-blur-sm px-8 h-24 flex items-center justify-between">
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center flex-1">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#4a4238] hover:text-[#a68e7b] transition-colors">
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            )}
          </button>
        </div>

        {/* Left Links */}
        <div className="hidden md:flex items-center gap-8 text-[12px] font-bold text-[#4a4238] uppercase tracking-widest flex-1">
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
        <div className="flex items-center justify-end gap-4 md:gap-6 text-[#4a4238] flex-1">
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center border border-[#a68e7b] rounded-full px-3 py-1">
              <input
                type="text"
                autoFocus
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="outline-none bg-transparent text-sm w-32 md:w-48 placeholder:text-gray-400"
              />
              <button type="submit" className="text-[#a68e7b] hover:text-[#4a4238] ml-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </button>
              <button type="button" onClick={() => setIsSearchOpen(false)} className="ml-2 text-gray-400 hover:text-[#4a4238]">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </form>
          ) : (
            <button onClick={() => setIsSearchOpen(true)} className="hover:text-[#a68e7b] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          )}

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

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[104px] left-0 w-full bg-white shadow-lg border-t border-[#e5e0d8] flex flex-col px-8 py-6 gap-6 text-[13px] font-bold text-[#4a4238] uppercase tracking-widest z-40">
          <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#a68e7b] transition-colors">Shop All</Link>
          <Link href="/new-arrivals" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#a68e7b] transition-colors">New Arrivals</Link>
          <Link href="/shop?category=boys" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#a68e7b] transition-colors">Boys</Link>
          <Link href="/shop?category=girls" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#a68e7b] transition-colors">Girls</Link>
        </div>
      )}
    </div>
  );
}
