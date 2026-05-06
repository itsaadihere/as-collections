import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/app/lib/supabase";

export const revalidate = 0;

export default async function NewArrivalsPage() {
  const products = await getProducts();
  // Automatically show the most recently added products (getProducts orders by created_at desc)
  const newArrivals = products.slice(0, 12);

  return (
    <div className="flex-1 bg-white pt-10">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <h1 className="text-4xl font-bold text-[#3b234a] italic mb-4">New Arrivals</h1>
        <p className="text-[#65586d] max-w-xl mx-auto">Check out our latest premium kids' clothing freshly added to the store.</p>
      </div>
      <ProductGrid products={newArrivals.map(p => ({ ...p, image: p.image_url || p.image }))} />
    </div>
  );
}
