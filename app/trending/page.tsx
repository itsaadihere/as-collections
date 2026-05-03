import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/app/lib/supabase";

export const revalidate = 0;

export default async function TrendingPage() {
  const products = await getProducts();
  const trending = products.filter(p => p.tag === 'Trending' || p.category === 'trending');
  return (
    <div className="flex-1 bg-white pt-10">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <h1 className="text-4xl font-bold text-[#3b234a] italic mb-4">Trending Now</h1>
        <p className="text-[#65586d] max-w-xl mx-auto">Discover the most loved and popular items in our store right now.</p>
      </div>
      <ProductGrid products={trending.map(p => ({ ...p, image: p.image_url }))} />
    </div>
  );
}
