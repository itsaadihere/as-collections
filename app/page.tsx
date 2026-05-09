import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/app/lib/supabase";

export const revalidate = 0;

export default async function Home() {
  const products = await getProducts();
  const newArrivals = products.slice(0, 6);

  return (
    <div className="flex-1 bg-[#fbf9f6]">
      {/* Hero Section */}
      <div className="relative w-full h-[85vh] overflow-hidden">
        <img 
          src="/hero-baby.png" 
          alt="Premium Kids Clothing"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-serif text-5xl md:text-[5rem] text-white mb-4 tracking-wide leading-[1.1] drop-shadow-lg">
            Where Heritage Meets <br /> Modern Play
          </h1>
          <p className="text-white text-sm md:text-base font-medium tracking-wide drop-shadow-md mb-8 max-w-lg">
            Premium organic cotton clothing for your little ones. Ethically crafted in Pakistan with love and care.
          </p>
          <Link href="/shop" className="bg-white hover:bg-[#fbf9f6] text-[#4a4238] px-10 py-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors">
            Explore Collection
          </Link>
        </div>
      </div>

      {/* Features Bar */}
      <div className="border-b border-[#e5e0d8] bg-[#fbf9f6]">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 md:gap-8 md:divide-x md:divide-[#e5e0d8] text-center">
          <div className="flex flex-col items-center justify-center space-y-2">
            <span className="font-serif text-[15px] md:text-[17px] text-[#4a4238]">Organic Cotton</span>
            <span className="text-[9px] text-[#8c8273] uppercase tracking-[0.2em]">Gentle on skin</span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <span className="font-serif text-[15px] md:text-[17px] text-[#4a4238]">Ethically Made</span>
            <span className="text-[9px] text-[#8c8273] uppercase tracking-[0.2em]">In Pakistan</span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <span className="font-serif text-[15px] md:text-[17px] text-[#4a4238]">Premium Quality</span>
            <span className="text-[9px] text-[#8c8273] uppercase tracking-[0.2em]">Built to last</span>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <span className="font-serif text-[15px] md:text-[17px] text-[#4a4238]">Fast Delivery</span>
            <span className="text-[9px] text-[#8c8273] uppercase tracking-[0.2em]">Nationwide</span>
          </div>
        </div>
      </div>

      {/* Curated For You */}
      <div className="pt-24 pb-12 bg-[#fbf9f6]">
        <ProductGrid 
          products={newArrivals.map(p => ({ ...p, image: p.image_url || p.image }))} 
          title="Curated For You" 
          subtitle="Discover our most loved pieces this season"
          linkText="VIEW ALL"
          linkHref="/new-arrivals"
        />
      </div>

    </div>
  );
}
