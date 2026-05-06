import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#fbf9f6] text-[#4a4238] py-20 border-t border-[#e5e0d8] mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
        
        {/* Brand & Socials */}
        <div className="space-y-6 pr-4">
          <h2 className="font-serif text-[22px] tracking-[0.15em]">AS COLLECTION</h2>
          <p className="text-[11px] leading-relaxed text-[#8c8273] max-w-xs">
            Premium Pakistani kids clothing brand. A boutique experience for GenZ and millennial moms, blending heritage with modern minimalist sensibility.
          </p>
          <div className="flex gap-4 pt-2 text-[#8c8273]">
            <a href="#" className="hover:text-[#4a4238] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="hover:text-[#4a4238] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="hover:text-[#4a4238] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
          </div>
        </div>

        {/* Shop */}
        <div className="space-y-6">
          <h3 className="font-serif text-[17px]">Shop</h3>
          <ul className="space-y-4 text-[11px] text-[#8c8273]">
            <li><Link href="/shop" className="hover:text-[#4a4238] transition-colors">All Products</Link></li>
            <li><Link href="/new-arrivals" className="hover:text-[#4a4238] transition-colors">New Arrivals</Link></li>
            <li><Link href="/shop?category=girls" className="hover:text-[#4a4238] transition-colors">Girls</Link></li>
            <li><Link href="/shop?category=boys" className="hover:text-[#4a4238] transition-colors">Boys</Link></li>
            <li><Link href="/shop" className="hover:text-[#4a4238] transition-colors">Toddlers</Link></li>
            <li><Link href="/shop" className="hover:text-[#4a4238] transition-colors">Sale</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="space-y-6">
          <h3 className="font-serif text-[17px]">Customer Care</h3>
          <ul className="space-y-4 text-[11px] text-[#8c8273]">
            <li><Link href="/account" className="hover:text-[#4a4238] transition-colors">My Account</Link></li>
            <li><Link href="/track-order" className="hover:text-[#4a4238] transition-colors">Track Order</Link></li>
            <li><Link href="/shipping" className="hover:text-[#4a4238] transition-colors">Shipping & Returns</Link></li>
            <li><Link href="/size-guide" className="hover:text-[#4a4238] transition-colors">Size Guide</Link></li>
            <li><Link href="/faq" className="hover:text-[#4a4238] transition-colors">FAQs</Link></li>
            <li><Link href="/contact" className="hover:text-[#4a4238] transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-6">
          <h3 className="font-serif text-[17px]">Newsletter</h3>
          <p className="text-[11px] text-[#8c8273] leading-relaxed">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <div className="flex border-b border-[#d4cec5] py-2">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-transparent w-full text-[11px] outline-none placeholder-[#8c8273] text-[#4a4238]"
            />
            <button className="text-[9px] font-bold tracking-[0.2em] text-[#4a4238] hover:text-[#a68e7b] transition-colors ml-2">
              SUBSCRIBE
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
