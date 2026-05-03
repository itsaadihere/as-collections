import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/app/lib/supabase";

export const revalidate = 0; // Disable static caching so DB changes appear immediately

export default async function Home() {
  const products = await getProducts();
  const trendingProducts = products.filter(p => p.tag === 'Trending').slice(0, 4);

  return (
    <div className="flex-1 overflow-hidden relative">
      {/* Decorative Background Shapes */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[60%] bg-[#eef7f6] rounded-br-[50%] rounded-tr-[40%] rounded-bl-[20%] -z-10 blur-sm opacity-80" />
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[80%] bg-[#fdf3f5] rounded-bl-[60%] rounded-tl-[40%] rounded-br-[30%] -z-10 blur-sm opacity-80" />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10" id="home">
        
        {/* Left Column - Text Content */}
        <div className="flex flex-col items-start pt-10">
          <div className="inline-flex items-center gap-2 text-sm font-bold tracking-wider text-[#f17a7e] mb-6 uppercase">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
            FLAT 30% OFF + CASHBACK! *
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-[70px] font-bold text-[#3b234a] leading-[1.1] mb-6 italic tracking-tight">
            Baby Essential <br/>
            Fashion & Nursery
          </h1>
          
          <p className="text-[#65586d] text-lg leading-relaxed max-w-md mb-4">
            Fermentum, cursus ultrices porttitor tincidunt suscipit quam facilisis sit massa pellentesque mi quis elit elementum tristique urna.
          </p>
          
          <p className="text-[#65586d] text-sm mb-10">
            * Enim cras quam et nullam risus nec tincidunt mattis nunc.
          </p>
          
          <div className="flex items-center gap-8">
            <Link 
              href="/shop" 
              className="px-8 py-3.5 bg-[#f17a7e] hover:bg-[#e0696d] text-white font-bold tracking-wider text-sm rounded shadow-md transition-colors shadow-[#f17a7e]/30"
            >
              SHOP NOW
            </Link>
          </div>
        </div>

        {/* Right Column - Image Showcase */}
        <div className="relative h-[500px] lg:h-[600px] flex justify-center items-center mt-10 lg:mt-0 px-4">
          {/* Aesthetic Backing Shapes */}
          <div className="absolute top-[10%] right-[10%] w-[80%] h-[80%] bg-[#fdf3f5] rounded-[3rem] -z-10 rotate-3 transition-transform hover:rotate-6 duration-500" />
          <div className="absolute top-[5%] right-[5%] w-[80%] h-[80%] bg-[#fae58e] rounded-[3rem] -z-20 -rotate-3 transition-transform hover:-rotate-6 duration-500" />
          
          {/* Main Lifestyle Image */}
          <div className="relative w-full max-w-[450px] h-[90%] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white z-10 group">
            <img 
              src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800&h=1000" 
              alt="Premium kids fashion" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
          
          {/* Floating Badge */}
          <div className="absolute bottom-10 left-0 lg:-left-10 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl z-20 animate-bounce" style={{ animationDuration: '3s' }}>
            <p className="text-[#3b234a] font-bold text-sm">✨ 100% Organic</p>
            <p className="text-[#65586d] text-xs">Safe for baby's skin</p>
          </div>
        </div>
      </main>

      <ProductGrid 
        products={trendingProducts.map(p => ({ ...p, image: p.image_url }))} 
        title="Trending Products" 
        subtitle="Explore our most loved kids' clothing items."
        linkText="View All Products"
        linkHref="/shop"
      />
    </div>
  );
}
