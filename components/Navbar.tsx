import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="relative z-50 border-b border-[#fdf3f5]/50 bg-[#fffbf9]/80 backdrop-blur-sm sticky top-0">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <img 
              src="/logo.png" 
              alt="A.S Collection Logo" 
              className="h-14 w-auto object-contain mix-blend-multiply"
            />
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-base font-medium text-[#65586d]">
          <Link href="/" className="hover:text-[#f17a7e] transition-colors">
            Home
          </Link>
          <Link href="/shop" className="hover:text-[#f17a7e] transition-colors">
            Shop
          </Link>
          <Link href="/new-arrivals" className="hover:text-[#f17a7e] transition-colors">
            New Arrivals
          </Link>
          <Link href="/trending" className="hover:text-[#f17a7e] transition-colors">
            Trending
          </Link>
          <Link href="/about" className="hover:text-[#f17a7e] transition-colors">
            About Us
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-white rounded-md shadow-sm border border-gray-100 px-4 py-2">
            <input 
              type="text" 
              placeholder="Search products ..." 
              className="bg-transparent border-none outline-none text-sm w-48 placeholder-gray-400 text-[#3b234a]"
            />
            <button className="text-[#f17a7e]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          </div>
          
          <button className="text-[#f17a7e] p-2 relative hover:opacity-80 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span className="absolute top-0 right-0 bg-[#f17a7e] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
